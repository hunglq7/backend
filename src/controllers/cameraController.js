const http = require('http');
const https = require('https');
const net = require('net');
const { exec } = require('child_process');
const os = require('os');
const XLSX = require('xlsx');
const cameraModel = require('../models/cameraModel');

const pingHost = async (address) => {
  const host = address.replace(/^https?:\/\//i, '').split(/[/?#:]/)[0].trim();
  const platform = os.platform();
  const pingCommand = platform === 'win32'
    ? `ping -n 1 -w 3000 ${host}`
    : `ping -c 1 -W 3 ${host}`;

  return new Promise((resolve) => {
    exec(pingCommand, (error, stdout, stderr) => {
      if (!error) {
        return resolve(true);
      }
      resolve(false);
    });
  });
};

const checkTcpPort = (address, port, timeout = 2000) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const host = address.replace(/^https?:\/\//i, '').split(/[/?#:]/)[0].trim();

    socket.setTimeout(timeout);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
};

const probeCameraAddress = async (address) => {
  let url = address?.trim();
  if (!url) {
    return false;
  }

  const pingResult = await pingHost(address);
  if (pingResult) {
    console.log(`Camera ${address} is reachable via ping`);
    return true;
  }

  console.log(`Camera ${address} ping failed, trying TCP ports`);

  const portsToCheck = [80, 8000, 8080, 554, 8554, 5000];
  for (const port of portsToCheck) {
    const portOpen = await checkTcpPort(url, port, 2000);
    if (portOpen) {
      console.log(`Camera ${address} responded on TCP port ${port}`);
      return true;
    }
  }

  console.log(`Camera ${address} is offline (ping and TCP checks failed)`);
  return false;
};

const getAllCameras = async (req, res) => {
  try {
    const cameras = await cameraModel.getAllCameras();
    res.json(cameras);
  } catch (error) {
    console.error('Error fetching cameras:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCameraById = async (req, res) => {
  try {
    const { id } = req.params;
    const camera = await cameraModel.findById(id);
    if (!camera) {
      return res.status(404).json({ error: 'Camera not found' });
    }
    res.json(camera);
  } catch (error) {
    console.error('Error fetching camera by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createCamera = async (req, res) => {
  try {
    const { name, ip_address, location } = req.body;
    if (!name || !ip_address) {
      return res.status(400).json({ error: 'Name and IP address are required' });
    }

    const [result] = await cameraModel.createCamera(name, ip_address, location || null);
    res.status(201).json({
      id: result.insertId,
      name,
      ip_address,
      location: location || null,
      is_online: false,
      last_check: null,
    });
  } catch (error) {
    console.error('Error creating camera:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCamera = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ip_address, location, is_online, last_check } = req.body;
    const camera = await cameraModel.findById(id);
    if (!camera) {
      return res.status(404).json({ error: 'Camera not found' });
    }

    await cameraModel.updateCamera(
      id,
      name ?? camera.name,
      ip_address ?? camera.ip_address,
      location ?? camera.location,
      typeof is_online === 'boolean' ? is_online : camera.is_online,
      last_check ?? camera.last_check,
    );

    res.json({
      id: Number(id),
      name: name ?? camera.name,
      ip_address: ip_address ?? camera.ip_address,
      location: location ?? camera.location,
      is_online: typeof is_online === 'boolean' ? is_online : camera.is_online,
      last_check: last_check ?? camera.last_check,
    });
  } catch (error) {
    console.error('Error updating camera:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCamera = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cameraModel.deleteCamera(id);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: 'Camera not found' });
    }
    res.json({ message: 'Camera deleted successfully' });
  } catch (error) {
    console.error('Error deleting camera:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCameras = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }
    await cameraModel.deleteCameras(ids);
    res.json({ message: 'Cameras deleted successfully' });
  } catch (error) {
    console.error('Error deleting cameras:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const normalizeIp = (ip) => String(ip || '').trim().toLowerCase();

const scanCamera = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Scanning camera with id: ${id}`);
    const camera = await cameraModel.findById(id);
    if (!camera) {
      console.log(`Camera not found: ${id}`);
      return res.status(404).json({ error: 'Camera not found' });
    }

    console.log(`Scanning camera ${camera.ip_address}`);
    const isOnline = await probeCameraAddress(camera.ip_address);
    const last_check = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(`Camera ${camera.ip_address} online status: ${isOnline}, last_check: ${last_check}`);
    await cameraModel.updateCameraStatus(id, isOnline, last_check);

    res.json({
      id: Number(id),
      is_online: isOnline,
      last_check,
    });
  } catch (error) {
    console.error('Error scanning camera:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const checkStatusByFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Upload file is required' });
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    const fileIpSet = new Set();
    for (const row of rows) {
      const ip = normalizeIp(
        row.ip_address || row.IP || row['Địa chỉ IP'] || row['IP Address'] || row.ip || row.IP || '',
      );
      if (ip) {
        fileIpSet.add(ip);
      }
    }

    if (fileIpSet.size === 0) {
      return res.status(400).json({ error: 'No IP addresses found in uploaded file' });
    }

    const last_check = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await cameraModel.updateCameraStatusesByIpList([...fileIpSet], last_check);

    const cameras = await cameraModel.getAllCameras();
    const dbIpSet = new Set(cameras.map((camera) => normalizeIp(camera.ip_address)));
    const unmatchedFileIps = [...fileIpSet].filter((ip) => !dbIpSet.has(ip));
    const onlineCount = cameras.filter((camera) => fileIpSet.has(normalizeIp(camera.ip_address))).length;
    const offlineCount = cameras.length - onlineCount;

    res.json({
      message: 'Status comparison completed',
      total_cameras: cameras.length,
      online_count: onlineCount,
      offline_count: offlineCount,
      unmatched_file_ips: unmatchedFileIps,
    });
  } catch (error) {
    console.error('Error checking status from file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTemplate = async (req, res) => {
  try {
    const headers = ["name", "ip_address", "location", "is_online", "last_check"];
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "template");
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="camera_template.xlsx"');
    res.send(buffer);
  } catch (error) {
    console.error('Error generating template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const importCameras = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Upload file is required' });
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

    const inserted = [];
    for (const row of rows) {
      const name = String(row.name || row.Name || row['Tên thiết bị'] || row['Device Name'] || '').trim();
      const ip_address = String(row.ip_address || row.IP || row['Địa chỉ IP'] || row['IP Address'] || '').trim();
      const location = String(row.location || row.Location || row['Vị trí lắp đặt'] || row['Location'] || '').trim() || null;
      if (!name || !ip_address) {
        continue;
      }
      await cameraModel.createCamera(name, ip_address, location);
      inserted.push({ name, ip_address, location });
    }

    res.json({ message: 'Import completed', inserted: inserted.length });
  } catch (error) {
    console.error('Error importing cameras:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllCameras,
  getCameraById,
  createCamera,
  updateCamera,
  deleteCamera,
  deleteCameras,
  scanCamera,
  checkStatusByFile,
  getTemplate,
  importCameras,
};

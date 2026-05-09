const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const authenticate = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/devices:
 *   get:
 *     tags: [Devices]
 *     summary: Get all devices
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of devices
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, deviceController.getAllDevices);

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     tags: [Devices]
 *     summary: Get device by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Device ID
 *     responses:
 *       200:
 *         description: Device data
 *       404:
 *         description: Device not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, deviceController.getDeviceById);

/**
 * @swagger
 * /api/devices:
 *   post:
 *     tags: [Devices]
 *     summary: Create a new device
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model_id:
 *                 type: integer
 *               warehouse_id:
 *                 type: integer
 *               serial_number:
 *                 type: string
 *               asset_code:
 *                 type: string
 *               mac_address:
 *                 type: string
 *               ip_address:
 *                 type: string
 *               purchase_date:
 *                 type: string
 *                 format: date
 *               warranty_expired_date:
 *                 type: string
 *                 format: date
 *               supplier_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *               note:
 *                 type: string
 *             required:
 *               - model_id
 *               - status_id
 *     responses:
 *       201:
 *         description: Device created
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, deviceController.createDevice);

/**
 * @swagger
 * /api/devices/{id}:
 *   put:
 *     tags: [Devices]
 *     summary: Update a device
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Device ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model_id:
 *                 type: integer
 *               warehouse_id:
 *                 type: integer
 *               serial_number:
 *                 type: string
 *               asset_code:
 *                 type: string
 *               mac_address:
 *                 type: string
 *               ip_address:
 *                 type: string
 *               purchase_date:
 *                 type: string
 *                 format: date
 *               warranty_expired_date:
 *                 type: string
 *                 format: date
 *               supplier_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *               note:
 *                 type: string
 *             required:
 *               - model_id
 *               - status_id
 *     responses:
 *       200:
 *         description: Device updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Device not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate, deviceController.updateDevice);

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     tags: [Devices]
 *     summary: Delete a device
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Device ID
 *     responses:
 *       200:
 *         description: Device deleted
 *       404:
 *         description: Device not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, deviceController.deleteDevice);

module.exports = router;
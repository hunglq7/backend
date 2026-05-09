const express = require('express');
const router = express.Router();
const deviceStatusController = require('../controllers/deviceStatusController');
const authenticate = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/device-status:
 *   get:
 *     tags: [DeviceStatus]
 *     summary: Get all device statuses
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of device statuses
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, deviceStatusController.getAllDeviceStatus);

/**
 * @swagger
 * /api/device-status/{id}:
 *   get:
 *     tags: [DeviceStatus]
 *     summary: Get device status by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Device status ID
 *     responses:
 *       200:
 *         description: Device status data
 *       404:
 *         description: Device status not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, deviceStatusController.getDeviceStatusById);

/**
 * @swagger
 * /api/device-status:
 *   post:
 *     tags: [DeviceStatus]
 *     summary: Create a new device status
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Device status created
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, deviceStatusController.createDeviceStatus);

/**
 * @swagger
 * /api/device-status/{id}:
 *   put:
 *     tags: [DeviceStatus]
 *     summary: Update a device status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Device status ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Device status updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Device status not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate, deviceStatusController.updateDeviceStatus);

/**
 * @swagger
 * /api/device-status/{id}:
 *   delete:
 *     tags: [DeviceStatus]
 *     summary: Delete a device status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Device status ID
 *     responses:
 *       200:
 *         description: Device status deleted
 *       404:
 *         description: Device status not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, deviceStatusController.deleteDeviceStatus);

module.exports = router;
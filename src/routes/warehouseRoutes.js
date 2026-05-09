const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const authenticate = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     tags: [Warehouses]
 *     summary: Get all warehouses
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of warehouses
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, warehouseController.getAllWarehouses);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     tags: [Warehouses]
 *     summary: Get warehouse by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Warehouse ID
 *     responses:
 *       200:
 *         description: Warehouse data
 *       404:
 *         description: Warehouse not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, warehouseController.getWarehouseById);

/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     tags: [Warehouses]
 *     summary: Create a new warehouse
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
 *               address:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Warehouse created
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, warehouseController.createWarehouse);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     tags: [Warehouses]
 *     summary: Update a warehouse
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Warehouse ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Warehouse updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Warehouse not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate, warehouseController.updateWarehouse);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     tags: [Warehouses]
 *     summary: Delete a warehouse
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Warehouse ID
 *     responses:
 *       200:
 *         description: Warehouse deleted
 *       404:
 *         description: Warehouse not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, warehouseController.deleteWarehouse);

module.exports = router;
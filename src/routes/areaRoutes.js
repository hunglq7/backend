const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');
const authenticate = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/areas:
 *   get:
 *     tags: [Areas]
 *     summary: Get all areas
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of areas
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, areaController.getAllAreas);

/**
 * @swagger
 * /api/areas/{id}:
 *   get:
 *     tags: [Areas]
 *     summary: Get area by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Area ID
 *     responses:
 *       200:
 *         description: Area data
 *       404:
 *         description: Area not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, areaController.getAreaById);

/**
 * @swagger
 * /api/areas:
 *   post:
 *     tags: [Areas]
 *     summary: Create a new area
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
 *               parent_id:
 *                 type: integer
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Area created
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, areaController.createArea);

/**
 * @swagger
 * /api/areas/{id}:
 *   put:
 *     tags: [Areas]
 *     summary: Update an area
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Area ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_id:
 *                 type: integer
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Area updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Area not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate, areaController.updateArea);

/**
 * @swagger
 * /api/areas/{id}:
 *   delete:
 *     tags: [Areas]
 *     summary: Delete an area
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Area ID
 *     responses:
 *       200:
 *         description: Area deleted
 *       404:
 *         description: Area not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, areaController.deleteArea);

module.exports = router;
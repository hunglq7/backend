const express = require('express');
const router = express.Router();
const modelsController = require('../controllers/modelsController');
const authenticate = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/models:
 *   get:
 *     tags: [Models]
 *     summary: Get all models
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of models
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, modelsController.getAllModels);

/**
 * @swagger
 * /api/models/{id}:
 *   get:
 *     tags: [Models]
 *     summary: Get model by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Model ID
 *     responses:
 *       200:
 *         description: Model data
 *       404:
 *         description: Model not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, modelsController.getModelById);

/**
 * @swagger
 * /api/models:
 *   post:
 *     tags: [Models]
 *     summary: Create a new model
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               brand_id:
 *                 type: integer
 *               model_code:
 *                 type: string
 *               model_name:
 *                 type: string
 *               specification:
 *                 type: string
 *             required:
 *               - category_id
 *               - brand_id
 *               - model_code
 *     responses:
 *       201:
 *         description: Model created
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, modelsController.createModel);

/**
 * @swagger
 * /api/models/{id}:
 *   put:
 *     tags: [Models]
 *     summary: Update a model
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Model ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               brand_id:
 *                 type: integer
 *               model_code:
 *                 type: string
 *               model_name:
 *                 type: string
 *               specification:
 *                 type: string
 *             required:
 *               - category_id
 *               - brand_id
 *               - model_code
 *     responses:
 *       200:
 *         description: Model updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Model not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate, modelsController.updateModel);

/**
 * @swagger
 * /api/models/{id}:
 *   delete:
 *     tags: [Models]
 *     summary: Delete a model
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Model ID
 *     responses:
 *       200:
 *         description: Model deleted
 *       404:
 *         description: Model not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, modelsController.deleteModel);

module.exports = router;
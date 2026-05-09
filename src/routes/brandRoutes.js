const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const authenticate = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/brands:
 *   get:
 *     tags: [Brands]
 *     summary: Get all brands
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of brands
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, brandController.getAllBrands);

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     tags: [Brands]
 *     summary: Get brand by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Brand data
 *       404:
 *         description: Brand not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, brandController.getBrandById);

/**
 * @swagger
 * /api/brands:
 *   post:
 *     tags: [Brands]
 *     summary: Create a new brand
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
 *               country:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Brand created
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, brandController.createBrand);

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     tags: [Brands]
 *     summary: Update a brand
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Brand updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Brand not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticate, brandController.updateBrand);

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     tags: [Brands]
 *     summary: Delete a brand
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Brand deleted
 *       404:
 *         description: Brand not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticate, brandController.deleteBrand);

module.exports = router;
const express = require('express');
const multer = require('multer');
const cameraController = require('../controllers/cameraController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', authenticate, cameraController.getAllCameras);
router.get('/template', authenticate, cameraController.getTemplate);
router.post('/import', authenticate, upload.single('upload_file'), cameraController.importCameras);
router.get('/:id', authenticate, cameraController.getCameraById);
router.post('/', authenticate, cameraController.createCamera);
router.put('/:id', authenticate, cameraController.updateCamera);
router.put('/:id/scan', authenticate, cameraController.scanCamera);
router.delete('/:id', authenticate, cameraController.deleteCamera);
router.delete('/', authenticate, cameraController.deleteCameras);

module.exports = router;

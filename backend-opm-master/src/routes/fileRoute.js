const express = require("express");
const router = express.Router();
const fileController = require('../controllers/fileController');

// file routes
router.post('/createFile', fileController.createFile);
router.get('/all', fileController.getAllFiles);
router.get('/:id', fileController.getFileById);
router.put('/updateFile', fileController.updateFile);
router.delete('/deleteFile', fileController.deleteFile);

module.exports = router;
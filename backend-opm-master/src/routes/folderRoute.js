const express = require("express");
const router = express.Router();
const folderController = require('../controllers/folderController');
const upload = require('../middlewares/fileMiddleware');

// folder routes
//router.post('/', folderController.createFolder);
router.post('/addFile', upload.array('files'), folderController.addFile);
router.post('/removeFile', folderController.removeFile);
router.get('/all', folderController.getAllFolders);
router.get('/:id', folderController.getFolderById);
router.get('/countFilesByClientId/:id', folderController.countFilesByClientId);
router.get('/getFilesByclientId/:id', folderController.getFilesByclientId);
router.put('/', folderController.updateFolder);
router.delete('/', folderController.deleteFolder);

module.exports = router;
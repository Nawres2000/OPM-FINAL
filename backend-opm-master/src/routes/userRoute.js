const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

// user routes
// router.get('/all', userController.getAllUsers);
// router.get('/:username', userController.getUserByUsername);
// router.put('/:id', userController.updateUser);
// router.delete('/:username', userController.deleteUser);
router.put('/change-password/:id', userController.changePassword);

module.exports = router;
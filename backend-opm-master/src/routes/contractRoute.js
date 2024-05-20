const express = require("express");
const router = express.Router();
const contractController = require('../controllers/contractController');

// Contract routes
router.post('/createContract', contractController.createContract);
router.get('/all', contractController.getAllContracts);
router.get('/getOneContractById/:id', contractController.getContractById); // Corrected endpoint name
router.put('/updateContract', contractController.updateContract); // Changed method to PUT for updating
router.post('/test', contractController.test);
router.delete('/deleteContract/:id', contractController.deleteContract); // Added parameter for contract ID

module.exports = router;

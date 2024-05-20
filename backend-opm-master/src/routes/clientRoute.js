const express = require("express");
const router = express.Router();
const clientController = require('../controllers/clientController');

// client routes
router.get('/all', clientController.getAllClients);
router.get('/getAllClientsByValid/:valid', clientController.getAllClientsByValid);
router.get('/getClientById/:id', clientController.getClientById);
router.get('/getClientByEmail', clientController.getClientByEmail);
router.put('/updateClient', clientController.updateClient);
router.put('/updateClientValidity', clientController.updateClientValidity);
router.delete('/deleteClient', clientController.deleteClient);

module.exports = router;
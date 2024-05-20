const express = require("express");
const router = express.Router();
const followUpController = require('../controllers/followUpController');
const upload = require('../middlewares/fileMiddleware');
// followUp routes
router.post('/createFollowUp', followUpController.createFollowUp);
router.get('/all', followUpController.getAllFollowUps);
router.get('/getFollowUpById/:id', followUpController.getFollowUpById);
router.get('/gefollowUpByTicketId/:id', followUpController.gefollowUpByTicketId);
router.post('/updateFollowUp', followUpController.updateFollowUp);
router.delete('/deleteFollowUp/:id', followUpController.deleteFollowUp);
router.post('/addTicket', upload.array('files'), followUpController.addTicket);
router.post('/removeTicket', followUpController.removeTicket);

// 
router.get('/getFollowUpsByClientId/:id', followUpController.getFollowUpsByClientId);
router.get('/getFollowUpsByEmployeeId/:id', followUpController.getFollowUpsByEmployeeId);
router.put('/assignTechnician/:id/:employeeId', followUpController.assignTechnician);
router.put('/updateStatus/:id/:status', followUpController.updateStatus);

module.exports = router;
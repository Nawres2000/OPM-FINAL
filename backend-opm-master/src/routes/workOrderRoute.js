const express = require("express");
const router = express.Router();
const workOrderController = require('../controllers/workOrderController');
const upload = require('../middlewares/fileMiddleware');
// workorder routes
router.post('/createWorkOrder', upload.array('files'), workOrderController.createWorkOrder);
router.post('/addTicket', upload.array('files'), workOrderController.addTicket);
router.delete('/:workOrderId/removeTicket/:ticketId', workOrderController.removeTicket);
router.get('/all', workOrderController.getAllWorkOrders);
router.get('/getWorkOrderById/:id/:authority', workOrderController.getWorkOrderById);
router.get('/getWorkOrderByStatus/:id/:status', workOrderController.getWorkOrderByStatus);
// router.get('/getWorek/:id/:status', workOrderController.getWorkOrderByStatus);
router.get('/getUnhandledClients', workOrderController.getUnhandledClients);
router.get('/getHandledWorkOrders/:id', workOrderController.getHandledWorkOrders);
router.get('/countWorkOrderByClientId/:id', workOrderController.countWorkOrderByClientId);
router.get('/countUnhandledWorkOrderByClientId/:id', workOrderController.countUnhandledWorkOrderByClientId);
router.get('/getWorkOrderByClientId/:id', workOrderController.getWorkOrderByClientId);
router.get('/getWorkOrderByEmployeeId/:id', workOrderController.getWorkOrderByEmployeeId);
router.post('/addFollowUp', workOrderController.addFollowUp);
router.get('/removeFollowUp/:workOrderId/:followUpId', workOrderController.removeFollowUp);
// for stat by clt w tech
router.get('/getWorkOrderByClientIdByStatus/:id/:status', workOrderController.getWorkOrderByClientIdByStatus);
router.get('/getWorkOrderByEmployeeIdByStatus/:id/:status', workOrderController.getWorkOrderByEmployeeIdByStatus);
router.get('/getUnhandledWorkOrders/:id?', workOrderController.getUnhandledWorkOrders);
router.get('/getNonExpiredWorkOrders/:id?', workOrderController.getNonExpiredWorkOrders);
router.put('/updateWorkOrder', workOrderController.updateWorkOrder);
router.post('/uploadFiles', upload.array('files'), workOrderController.uploadFiles);
router.delete('/deleteWorkOrder/:id', workOrderController.deleteWorkOrder);

// 
router.put('/assignTechnician/:id/:employeeId', workOrderController.assignTechnician);
router.put('/updateStatus/:id/:status', workOrderController.updateStatus);

module.exports = router;
const express = require("express");
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const upload = require('../middlewares/fileMiddleware');

// ticket routes
router.post('/createTicket', ticketController.createTicket);
router.post('/ticketAddFile', upload.array('files'), ticketController.ticketAddFile);
router.delete('/ticketRemoveFile/:fileId/:ticketId', ticketController.ticketRemoveFile);
router.get('/all', ticketController.getAllTickets);
router.get('/getTicketById/:id', ticketController.getTicketById);
router.get('/countTicketsByClientId/:id', ticketController.countTicketsByClientId);
router.get('/getTicketByWorkOrderId/:id', ticketController.getTicketByWorkOrderId);
router.get('/getTicketByClientId/:id', ticketController.getTicketByClientId);
router.put('/updateTicket', ticketController.updateTicket);
router.delete('/deleteTicket/:id/:woId', ticketController.deleteTicket);

// 
router.put('/updateTicketStatus/:id/:status', ticketController.updateTicketStatus);
router.get('/getTicketByFollowUpId/:id', ticketController.getTicketByFollowUpId);

module.exports = router;    
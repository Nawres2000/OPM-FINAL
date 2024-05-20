const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    creationDate:{
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
        type: String,
        enum: ['New', 'Assigned', 'Closed'],
        default: 'New'
    },
    adminId: { type: mongoose.Schema.Types.ObjectId,  ref:'Admin' },
    workOrderId: { type: mongoose.Schema.Types.ObjectId,  ref:'WorkOrder' },
    followUpId: { type: mongoose.Schema.Types.ObjectId,  ref:'FollowUp' },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref:'Employee' },
    listOfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref:'File' }],
    escalationLevel: {
        type: Number,
        default: 1
    },
    serialNumber: {
        type: String
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;


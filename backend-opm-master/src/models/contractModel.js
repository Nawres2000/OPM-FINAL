const mongoose = require('mongoose');


// Schema for contracts with new attributes
const contractSchema = new mongoose.Schema({
    commercialResponsible: {
        type: String
    },
    technicalResponsible: {
        type: String
    },
    technicalEquipments: {
        type: String
    },
    nature: {
        type: String,
        enum: ['dev', 'system', 'cybersec', 'network']
    },
    type: {
        type: String,
        enum: ['support and maintenance soft', 'support and maintenance hard', 'outsourcing']
    },
    equipmentList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    SLA: {
        type: Number
    },
    escalationMatrix: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    },
    manufacturerSupport: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
});

// Model for contracts
const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;

const mongoose = require('mongoose');
const Contract = require('./contractModel');

const folderSchema = new mongoose.Schema({
    creationDate:{
      type: Date,
      default: Date.now
    },
    name: {
      type: String,
      required: true
    },
    contractId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Contract' },
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Client' },
    listOfFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
  });

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
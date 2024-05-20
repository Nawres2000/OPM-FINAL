const mongoose = require("mongoose");
const User = require("./userModel");

const clientSchema = new mongoose.Schema({
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contract",
    required: true,
  },
  company: { type: String, required: true },
  dateOfRegistration: { type: Date, required: true },
});

const Client = User.discriminator("Client", clientSchema);

module.exports = Client;

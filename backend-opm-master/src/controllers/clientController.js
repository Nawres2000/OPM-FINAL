const Client = require("../models/clientModel");

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const client = await Client.find({ deleted: false }).populate([
      {
        path: "contractId",
        model: "Contract",
      },
    ]);
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: client });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single clinet
exports.getClientByEmail = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: client });
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    client.password = null
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: client });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
};

exports.getAllClientsByValid = async (req, res) => {
  const { valid } = req.params;

  try {
    if (!valid) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    const client = await Client.find({ valid });
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: client });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Update a user client
exports.updateClient = async (req, res) => {
  try {
    const { email, company, dateOfRegistration } = req.body;
    let newEmail = req.body.newEmail;
    if (!newEmail) {
      newEmail = email;
    }
    const updatedClient = await Client.findOneAndUpdate(
      { email },
      { email: newEmail, company, dateOfRegistration },
      { new: true }
    );
    if (!updatedClient) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({
      err: false,
      message: "Successful operation !",
      rows: updatedClient,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: true, message: err.message });
  }
};

exports.updateClientValidity = async (req, res) => {
  try {
    const { email, valid } = req.body;
    const updatedClient = await Client.findOneAndUpdate({ email }, { valid });
    if (!updatedClient) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({
      err: false,
      message: "Successful operation !",
      rows: updatedClient,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: true, message: err.message });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      { email: req.query.email },
      { valid: false, deleted: true }
    );
    if (!client) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }

    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: client });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
};

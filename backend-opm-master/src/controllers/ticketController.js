const Ticket = require("../models/ticketModel");
const File = require("../models/fileModel");

// Add file to a ticket
exports.ticketAddFile = async (req, res) => {
  try {
    const files = req.files;
    const uploadedFiles = [];

    for (const file of files) {
      const newFile = File({
        fileName: file.filename,
        path: file.destination + "/" + file.filename,
        title: file.originalname,
      });
      await newFile.save();
      uploadedFiles.push(newFile._id);
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.body.ticketId,
      { $push: { listOfFiles: { $each: uploadedFiles } } },
      { new: true }
    ).populate("listOfFiles");

    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: ticket });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Remove file from a ticket
exports.ticketRemoveFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.fileId);
    if (!file) {
      return res.status(404).json({ err: true, message: "File not found!" });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.ticketId,
      { $pull: { listOfFiles: req.params.fileId } },
      { new: true }
    );

    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: ticket });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Create a ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(200).json({
      err: false,
      message: "Ticket created successfully!",
      rows: ticket,
    });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: tickets });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("listOfFiles");
    if (!ticket) {
      return res.status(404).json({ err: true, message: "Ticket not found!" });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: ticket });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a ticket by work order ID
exports.getTicketByWorkOrderId = async (req, res) => {
  const workOrderId = req.params.id;
  try {
    const ticket = await Ticket.find({ workOrderId }).populate("listOfFiles");
    if (!ticket) {
      return res.status(404).json({ err: true, message: "Ticket not found!" });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: ticket });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.getTicketByFollowUpId = async (req, res) => {
  const followUpId = req.params.id;
  try {
    const ticket = await Ticket.find({ followUpId }).populate("listOfFiles");
    if (!ticket) {
      return res.status(404).json({ err: true, message: "Ticket not found!" });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: ticket });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get tickets by client ID
exports.getTicketByClientId = async (req, res) => {
  const clientId = req.params.id;
  try {
    const tickets = await Ticket.find({ clientId });
    if (!tickets || tickets.length === 0) {
      return res
        .status(404)
        .json({ err: true, message: "No tickets found for this client!" });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: tickets });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Count tickets by client ID
exports.countTicketsByClientId = async (req, res) => {
  const clientId = req.params.id;
  try {
    const count = await Ticket.countDocuments({ clientId });
    res.status(200).json({
      err: false,
      message: "Successful operation !",
      rows: { count, clientId },
    });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Update a ticket
exports.updateTicket = async (req, res) => {
  try {
    const {
      _id,
      title,
      adminId,
      employeeId,
      status,
      description,
      escalationLevel,
      serialNumber,
    } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      _id,
      {
        title,
        adminId,
        employeeId,
        status,
        description,
        escalationLevel,
        serialNumber,
      },
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ err: true, message: "Ticket not found!" });
    }
    res.status(200).json({
      err: false,
      message: "Ticket updated successfully!",
      rows: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.params.status;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ err: true, message: "Ticket not found!" });
    }
    res.status(200).json({
      err: false,
      message: "Ticket updated successfully!",
      rows: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ err: true, message: "Ticket not found!" });
    }
    res.status(200).json({
      err: false,
      message: "Ticket deleted successfully!",
      rows: ticket,
    });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

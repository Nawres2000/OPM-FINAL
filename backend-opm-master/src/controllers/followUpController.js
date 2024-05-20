const FollowUp = require("../models/followUpModel");
const Ticket = require("../models/ticketModel");
const File = require("../models/fileModel");
const Client = require("../models/clientModel");
const Employee = require("../models/employeeModel");
const sendEmail = require("../middlewares/mailer");
exports.createFollowUp = async (req, res) => {
  try {
    const followUp = FollowUp(req.body);
    await followUp.save();
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: followUp });
    // }
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.addTicket = async (req, res) => {
  const { title, description, employeeId, followUpId } = req.body;
  try {
    const files = req.files; // Get the array of uploaded files
    const uploadedFiles = [];
    for (const file of files) {
      const newFile = File({
        fileName: file.filename,
        path: file.destination + "/" + file.filename,
        title: file.originalname,
      });
      await newFile.save();
      uploadedFiles.push(newFile);
    }
    const ticket = Ticket({
      title,
      description,
      employeeId,
      followUpId: followUpId,
      listOfFiles: uploadedFiles,
    });
    await ticket.save();
    const updatedFollowUp = await FollowUp.findByIdAndUpdate(
      { _id: followUpId },
      { $push: { ticketList: ticket._id } },
      { new: true }
    );
    res.status(200).json({
      err: false,
      message: "Successful operation !",
      rows: updatedFollowUp,
    });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.removeTicket = async (req, res) => {
  const { ticketId, clientId } = req.body;
  try {
    const ticket = await Ticket.findByIdAndDelete(ticketId);
    if (!ticket) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    const workOrder = await WorkOrder.findOneAndUpdate(
      { clientId: clientId },
      { ticketId: null },
      { new: true }
    );
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: workOrder });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get all followUps
exports.getAllFollowUps = async (req, res) => {
  try {
    const followUp = await FollowUp.find();
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: followUp });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single followUp .populate('clientId', 'employeeId');
exports.getFollowUpById = async (req, res) => {
  try {
    const followUp = await FollowUp.findById(req.params.id).populate([
      {
        path: "clientId",
        model: "Client",
        select: "company email authority",
      },
      {
        path: "employeeId",
        model: "Employee",
        select: "firstName lastName",
      },
      {
        path: "listOfFiles",
        model: "File",
      },
      {
        path: "ticketList",
        model: "Ticket",
        select: "title status creationDate description",
        populate: {
          path: "listOfFiles",
          model: "File",
        },
      },
    ]);
    if (!followUp) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: followUp });
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};
// Get a follow up by ticket id
exports.gefollowUpByTicketId = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const followUp = await FollowUp.findOne({ ticketId });
    if (!followUp) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: followUp });
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.gefollowUpByTicketId = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const followUp = await FollowUp.find({ ticketId });
    if (!followUp) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: followUp });
  } catch (err) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.getFollowUpsByClientId = async (req, res) => {
  const clientId = req.params.id;
  try {
    if (req.body.authority && req.body.authority == "client") {
      const followUps = await FollowUp.findById({ clientId })
        .populate([
          {
            path: "listOfFiles",
            model: "File",
          },
          {
            path: "clientId",
            model: "Client",
            select: "company",
          },
          {
            path: "employeeId",
            model: "Employee",
            select: "firstName lastName",
          },
        ])
        .select("-listOfTickets");
      if (!followUps) {
        return res
          .status(404)
          .json({ err: true, message: "No (data,operation) (found,done) ! " });
      }

      res.status(200).json({
        err: false,
        message: "Successful operation !",
        rows: followUps,
      });
    } else {
      const followUps = await FollowUp.find({ clientId }).populate([
        {
          path: "listOfFiles",
          model: "File",
        },
        {
          path: "clientId",
          model: "Client",
          select: "company",
        },
        {
          path: "employeeId",
          model: "Employee",
          select: "firstName lastName",
        },
        {
          path: "ticketList",
          model: "Ticket",
          select: "title status creationDate",
          populate: {
            path: "listOfFiles",
            model: "File",
          },
        },
      ]);
      if (!followUps) {
        return res
          .status(404)
          .json({ err: true, message: "No (data,operation) (found,done) ! " });
      }

      res.status(200).json({
        err: false,
        message: "Successful operation !",
        rows: followUps,
      });
    }
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.getFollowUpsByEmployeeId = async (req, res) => {
  const id = req.params.id;
  try {
    const followUp = await FollowUp.find({ employeeId: id }).populate([
      {
        path: "listOfFiles",
        model: "File",
      },
      {
        path: "clientId",
        model: "Client",
        select: "company",
      },
      {
        path: "employeeId",
        model: "Employee",
        select: "firstName lastName",
      },
      {
        path: "ticketList",
        model: "Ticket",
        select: "title status creationDate description",
        populate: {
          path: "listOfFiles",
          model: "File",
        },
      },
    ]);
    if (!followUp) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: followUp });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Update a user still working on it username
exports.updateFollowUp = async (req, res) => {
  try {
    const { _id, title, ticketId, status, signedBy } = req.body;
    const updatedFollowUp = await FollowUp.findByIdAndUpdate(
      { _id },
      { title, ticketId, status, signedBy },
      { new: true }
    );
    if (!updatedFollowUp) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({
      err: false,
      message: "Successful operation !",
      rows: updatedFollowUp,
    });
  } catch (err) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
// Delete a followUp
exports.deleteFollowUp = async (req, res) => {
  try {
    const followUp = await FollowUp.findByIdAndDelete(req.params.id);
    if (!followUp) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }

    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: followUp });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
};

//
exports.assignTechnician = async (req, res) => {
  const id = req.params.id;
  const employeeId = req.params.employeeId;
  try {
    const followUp = await FollowUp.findOneAndUpdate(
      {
        _id: id,
      },
      {
        employeeId,
      }
    );
    if (!followUp) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: followUp });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  try {
    const followUp = await FollowUp.findOneAndUpdate(
      {
        _id: id,
      },
      {
        status,
      }
    );
    if (!followUp) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    if (status === "Done") {
      followUp.finishDate = Date.now();
      await followUp.save();
      let client = await Client.findById(followUp.clientId);
      let text = 'Follow Up finished successfully.';
      await sendEmail(client.email ,`Follow Up - ${followUp._id}`, text);
    }

    if (status === "Valid") {
      let employee = await Employee.findById(followUp.employeeId).email;
      let text = 'Follow Up validated successfully.';
      await sendEmail(employee.email ,`Follow Up - ${followUp._id}`, text);
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: followUp });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

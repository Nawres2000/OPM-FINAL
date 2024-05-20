const WorkOrder = require("../models/workOrderModel");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Contract = require("../models/contractModel");

const Employee = require("../models/employeeModel");

exports.countUsersByAuthority = async (req, res) => {
  const authority = req.params.authority;
  try {
    const count = await User.countDocuments({ authority: authority });
    res
      .status(200)
      .json({
        err: false,
        message: "Successful operation !",
        rows: { count, authority },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countUnhandledWorkOrderByClientId = async (req, res) => {
  const { clientId, status } = req.params;
  try {
    if (status) {
      const count = await WorkOrder.countDocuments({
        clientId: clientId,
        status: status,
        $or: [
          { employeeId: null }, // Check if employeeId is null
          { employeeId: { $exists: false } }, // Check if employeeId does not exist
        ],
      });
      res
        .status(200)
        .json({
          err: false,
          message: "Successful operation !",
          rows: { count, clientId },
        });
    } else {
      const count = await WorkOrder.countDocuments({
        clientId: clientId,
        $or: [
          { employeeId: null }, // Check if employeeId is null
          { employeeId: { $exists: false } }, // Check if employeeId does not exist
        ],
      });
      res
        .status(200)
        .json({
          err: false,
          message: "Successful operation !",
          rows: { count, clientId },
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countContracts = async (req, res) => {
  try {
    const count = await Contract.countDocuments();
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: { count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countEmployees = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: { count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countWorkOrders = async (req, res) => {
  try {
    const count = await WorkOrder.countDocuments();
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: { count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countWorkOrdersBayClintIdStatus = async (req, res) => {
  const { clientId, status } = req.params;
  try {
    const count = await WorkOrder.countDocuments({
      clientId: clientId,
      status: status,
    });
    res
      .status(200)
      .json({
        err: false,
        message: "Successful operation !",
        rows: { count, clientId },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countAllTiket = async (req, res) => {
  try {
    const count = await Ticket.countDocuments();
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: { count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countUnhandledWorkOrder = async (req, res) => {
  try {
    const count = await WorkOrder.countDocuments({
      $or: [
        { employeeId: null }, // Check if employeeId is null
        { employeeId: { $exists: false } }, // Check if employeeId does not exist
      ],
    });
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: { count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countAllWorekOrderBayClient = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await WorkOrder.countDocuments({ clientId: id });
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: { count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countWorkOrderByEmployeeId = async (req, res) => {
  const { employeeId, status } = req.params;
  try {
    if (status) {
      const count = await WorkOrder.countDocuments({
        employeeId: employeeId,
        status: status,
      });
      res
        .status(200)
        .json({
          err: false,
          message: "Successful operation !",
          rows: { count, employeeId },
        });
    } else {
      const count = await WorkOrder.countDocuments({ employeeId: employeeId });
      res
        .status(200)
        .json({
          err: false,
          message: "Successful operation !",
          rows: { count, employeeId },
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countWorkOrderByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const count = await WorkOrder.countDocuments({ status: status });
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: { count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};
exports.countTicketsByEmployeeId = async (req, res) => {
  const { employeeId } = req.params;
  try {
    if (employeeId) {
      const count = await Ticket.countDocuments({ employeeId: employeeId });
      res
        .status(200)
        .json({
          err: false,
          message: "Successful operation !",
          rows: { count, employeeId },
        });
    } else {
      const count = await Ticket.countDocuments();
      res
        .status(200)
        .json({
          err: false,
          message: "Successful operation !",
          rows: { count, employeeId },
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.countUnhandledWorkOrderBayClient = async (req, res) => {
  const { ClientId } = req.params;
  try {
    const count = await WorkOrder.countDocuments({
      clientId: ClientId,
      $or: [
        { employeeId: null }, // Check if employeeId is null
        { employeeId: { $exists: false } }, // Check if employeeId does not exist
      ],
    });
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: { count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: true, message: error.message });
  }
};

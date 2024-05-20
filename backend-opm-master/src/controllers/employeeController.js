const Employee = require("../models/employeeModel");

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employee = await Employee.find({ deleted: false });
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: employee });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};
// Get all employees by validity
exports.getAllEmployeesByValid = async (req, res) => {
  const { valid, userRolle } = req.params;
  try {
    if (!valid || !userRolle) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    // const employee = await Employee.find({ valid });
    const employee = await Employee.find({
      valid: valid,
      authority: userRolle,
    });
    // .find({clientId:user._id})
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: employee });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};
// Get all employees by authority
exports.getAllEmployeesByAuthority = async (req, res) => {
  const { authority } = req.params;
  try {
    if (!authority) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    const employee = await Employee.find({ authority });
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: employee });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single clinet
exports.getEmployeeByEmail = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ email: req.body.email });
    if (!employee) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: employee });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    employee.password = null;
    res.status(200).json({
      err: false,
      message: "Successful operation !",
      rows: employee,
    });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Update a user still working on it username
exports.updateEmployee = async (req, res) => {
  try {
    const { email, firstName, lastName, birthDate } = req.body;
    var newEmail = req.body.newEmail;
    if (!newEmail) {
      newEmail = email;
    }
    const updatedEmployee = await Employee.findOneAndUpdate(
      { email },
      { email: newEmail, firstName, lastName, birthDate }
    );
    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) !" });
    }
    res.status(200).json({
      err: false,
      message: "Successful operation !",
      rows: updatedEmployee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: true, message: err.message });
  }
};

exports.updateEmployeeValidity = async (req, res) => {
  try {
    const { email, valid } = req.body;
    const updatedEmployee = await Employee.findOneAndUpdate(
      { email },
      { valid }
    );
    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) !" });
    }
    res.status(200).json({
      err: false,
      message: "Successful operation !",
      rows: updatedEmployee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: true, message: err.message });
  }
};

// Delete a employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { email: req.query.email },
      { deleted: true, valid: false },
      { new: true }
    );
    if (!employee) {
      return res
        .status(404)
        .json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: employee });
  } catch (error) {
    res.status(500).send({ err: true, message: error.message });
  }
};

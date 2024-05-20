const Contract = require("../models/contractModel");

// Create a contract
exports.createContract = async (req, res) => {
  try {
    const {
      commercialResponsible,
      technicalResponsible,
      technicalEquipments,
      nature,
      type,
      equipmentList,
      SLA,
      escalationMatrix,
      manufacturerSupport,
      startDate,
      endDate,
    } = req.body;
    const contract = new Contract({
      commercialResponsible,
      technicalResponsible,
      technicalEquipments,
      nature,
      type,
      equipmentList,
      SLA,
      escalationMatrix,
      manufacturerSupport,
      startDate,
      endDate,
    });
    await contract.save();
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: contract });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get all contracts
exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: contracts });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a contract by its ID
exports.getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ err: true, message: "No contract found!" });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: contract });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Update a contract
exports.updateContract = async (req, res) => {
  try {
    const { _id, type, SLA } = req.body;
    const updatedContract = await Contract.findByIdAndUpdate(
      _id,
      {
        type,
        SLA,
      },
      { new: true }
    );
    if (!updatedContract) {
      return res.status(404).json({ err: true, message: "No contract found!" });
    }
    res.status(200).json({
      err: false,
      message: "Successful operation !",
      rows: updatedContract,
    });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Delete a contract
exports.deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    if (!contract) {
      return res.status(404).json({ err: true, message: "No contract found!" });
    }
    res
      .status(200)
      .json({ err: false, message: "Successful operation !", rows: contract });
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

exports.test = async (req, res) => {
  res.status(200).json("ok");
};

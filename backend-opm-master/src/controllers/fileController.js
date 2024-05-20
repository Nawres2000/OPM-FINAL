const File = require('../models/fileModel');

exports.createFile = async (req, res) => {
  try {
    const file = File(req.body);
    await file.save();
    res.status(200).json({err: false, message: "Successful operation !", rows: file});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get all files
exports.getAllFiles = async (req, res) => {
  try {
    const file = await File.find();
    res.status(200).json({err: false, message: "Successful operation !", rows: file});
  } catch (error) {
    res.status(500).json({ err: true, message: error.message });
  }
};

// Get a single file
exports.getFileById = async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      if (!file) {
        return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
      }
      res.status(200).json({err: false, message: "Successful operation !", rows: file});
    } catch (err) {
      res.status(500).json({ err: true, message: err.message });
    }
  };
  
  exports.countFilesByClientId = async (req, res) => {
    const clientId = req.params.id;
    try {
      const count = await File.countDocuments({ clientId });
      res.status(200).json({err: false, message: "Successful operation !", rows: count, clientId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: true, message: error.message });
    }
  };

// Update a user still working on it username
exports.updateFile = async (req, res) => {
  try {
    const { _id, path, fileName } = req.body;
    const updatedFile = await File.findByIdAndUpdate(
      { _id },
      { path, fileName },
      { new: true }
    );
    if (!updatedFile) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }
    res.status(200).json({err: false, message: "Successful operation !", rows: updatedFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: true, message: err.message });
  }
};

// Delete a file
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(req.body._id);
    if (!file) {
      return res.status(404).json({ err: true, message: "No (data,operation) (found,done) ! " });
    }

    res.status(200).json({err: false, message: "Successful operation !", rows: file});
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
};

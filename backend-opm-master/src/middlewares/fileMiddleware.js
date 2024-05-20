const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Function to create folders recursively
const createFolder = (folderPath) => {
  // Check if the folder already exists
  if (fs.existsSync(folderPath)) {
    return;
  }

  // Create the folder
  fs.mkdirSync(folderPath, { recursive: true });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join("uploads");
    const newFolderPath = path.join(
      uploadDir,
      req.body.clientId || req.body.workOrderId || req.body.followUpId || req.body.ticketId,
      file.mimetype
    );

    // Create the new folder
    createFolder(newFolderPath);

    // Set the destination folder for the file
    cb(null, newFolderPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });
module.exports = upload;

// middleware/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;

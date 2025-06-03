// routes/cvUploadRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadCvToS3AndSaveLink } = require("../controllers/cvUploadController.js");

router.post("/cv/upload", upload.single("cv"), uploadCvToS3AndSaveLink);

module.exports = router;

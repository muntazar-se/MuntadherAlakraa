// controllers/cvUploadController.js
const s3 = require("../utils/s3");
const Profile = require("../models/profileModel");

const uploadCvToS3AndSaveLink = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileName = `cv/${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();

    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    profile.cvLink = uploadResult.Location;
    await profile.save();

    res.status(200).json({ message: "✅ CV uploaded", url: uploadResult.Location });
  } catch (err) {
    console.error("❌ Error uploading CV:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadCvToS3AndSaveLink };

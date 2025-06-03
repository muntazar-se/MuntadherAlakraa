const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    title: String,
    bio: String,
    email: String,
    cvLink: String,
    socialMedia: {
      linkedin: String,
      github: String,
      twitter: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Profile", profileSchema, "profile");


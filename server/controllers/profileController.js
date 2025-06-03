const Profile = require("../models/profileModel");

// GET profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne(); // assuming there's only one profile
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// UPDATE profile
exports.updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      // Create if not exists
      profile = new Profile(req.body);
    } else {
      // Update existing
      Object.assign(profile, req.body);
    }

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

const userModel = require("../models/userSchema");
const { getUser } = require("../controllers/token");
const updateProfile = async (req, res) => {
  console.log("req.body:", req.body);
  const { username } = req.body;

  try {
    const user = await getUser(req.cookies.mycookie);
    if (!req.file && !username) {
      return res.json({ message: "Nothing to update", sucess: false });
    }
    let  userData;
    if (req.file) {
      const imagePath = `/images/${req.file.filename}`; // Path to save in DB

      // Find the user and update the image path
     userData = await userModel.findByIdAndUpdate(
        user.id,
        { profileImage: imagePath, username },
        { new: true }
      );
    }else{
      userData = await userModel.findByIdAndUpdate(
        user.id,
        {username },
        { new: true }
      );
    }
    res
      .status(200)
      .json({
        message: "Profile Updated successfully",
        userData,
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error updating profile",
        error: error.message,
        sucess: false,
      });
  }
};
module.exports = { updateProfile };

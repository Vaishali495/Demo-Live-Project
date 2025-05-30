const { comparePassword, bcryptPassword } = require("./bcrypt");
const { makeToken, getUser } = require("./token");
const userModel = require("../models/userSchema");
const otpModel = require("../models/otpSchema");
// const assignedTasks = require("../models/assignedTaskSchema");
const { sendEmail } = require("./MailAuth");
const validator = require("validator");
// const mongoose = require("mongoose");
// const taskModel = require("../models/taskSchema");

const verifyEmail = async (req, res) => {
  console.log("/verify", req.body);
  const { email } = req.body;
  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    console.log("User already exists!");
    return res.json({ message: "User already exists", success: false });
  }
  const otp = await sendEmail(email);
  console.log(otp);
  try {
    const otpStored = new otpModel({
      email: email,
      otp: otp,
    });
    await otpStored.save();
    console.log(otpStored);
    res.json({ message: "Otp Sent", success: true });
  } catch (error) {
    console.log("Error saving Otp: ", error);
    res.status(500).json({ message: "Otp Sent Failed", success: false });
  }
};

const loginUser = async (req, res) => {
  console.log("inside /login");
  if (validator.isEmail(req.body.email)) {
    try {
      let user = await userModel
        .findOne({ email: req.body.email })
        .populate([{ path: "mytasks", match: { isDisable: false } }]); // Only populate `mytasks` for now.

      // // Check if assignTasks model is available
      // if (mongoose.modelNames().includes('assignTasks')) {
      //   user = await userModel
      //     .findOne({ email: req.body.email })
      //     .populate([
      //       { path: "mytasks", match: { isDisable: false } }
      //     ]);
      // }

      if (user) {
        let check = await comparePassword(req.body.password, user.password); //compare bcrypt pswrd to plain pssword
        if (check) {
          var obj = {
            email: user.email,
            id: user._id,
          };
          const token = makeToken(obj); //create token
          res.cookie("mycookie", token, {
            httpOnly: true, // Secure from JavaScript access
            secure: true, // Set to true in production (HTTPS required)
            sameSite: "None", // Required for cross-origin cookies
          }); //store in cookie
          res.status(200).json({
            message: "Login successful",
            userDetails: user,
            success: true,
          });
        } else {
          res.json({ message: "Invalid credentials", success: false });
        }
      } else {
        res.json({ message: "User not found", success: false });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({ message: "User not found", success: false });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("mycookie");
  res.status(200).json({ message: "Logged out successfully", success: true });
};

const signupUser = async (req, res) => {
  console.log("/signup");
  console.log(req.body);
  const { otpNumber, username, email } = req.body;
  //  Sorts documents by createdAt in descending order (latest first).
  const otpData = await otpModel.findOne({ email }).sort({ createdAt: -1 });
  console.log("OtpData", otpData);
  if (!otpData) {
    return res.json({ success: false, message: "OTP expired!!" });
  }

  if (otpData.email == email && otpData.otp == otpNumber) {
    try {
      const password = await bcryptPassword(req.body.password);
      const newUser = new userModel({
        username,
        email,
        password,
      });
      await newUser.save();
      console.log("user", newUser);
      // var obj = { email: newUser.email, id: newUser._id };
      // const token = makeToken(obj);
      // res.cookie("mycookie", token);
      res
        .status(201)
        .json({ message: "User created successfully", success: true });
    } catch (err) {
      console.log(err);
      res.json({ message: "Error creating user", success: false });
    }
  } else {
    res.json({ success: false, message: "Invalid Otp" });
  }
};

const getUserData = async (req, res) => {
  console.log("----inside getUserData function");
  const user = await getUser(req.cookies.mycookie);
  console.log(user);
  if (user) {
    try {
      const userdata = await userModel
        .findById(user.id)
        .populate([{ path: "mytasks", match: { isDisable: false } }]);

      // const AllTasks = await taskModel.find();
      // console.log("Tasks from DB ", tasks);
      if (userdata) res.status(200).json({ userdata, success: true });
      else {
        res.json({ message: "User not found in DB", success: false });
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).json({
        error: "Internal server error. Please try again later.",
        success: false,
      });
    }
  } else {
    res.json({
      message: "Please login First to access this route!!",
      success: false,
    });
  }
};

// verify email of user for forget password
const verifyExistingEmail = async (req, res) => {
  const { email } = req.body;
  console.log(req.body)
  try {
    if (!email) {
      return res.json({ message: "Send a valid Email!!", success: false });
    }
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      const otp = await sendEmail(email);
      console.log("Otp for Forget Password", otp);
      const otpStored = new otpModel({
        email: email,
        otp: otp,
      });
      await otpStored.save();
      // console.log("Otp for Forget Password",otpStored);
      res.json({ message: "Otp Sent to your email", success: true });
    } else {
      res.json({ message: "User doesn't Exist!!", success: false });
    }
  } catch (err) {
    console.log("Error Checking Existing User : ", err);
    res.json({ message: "Error Checking Existing User", success: false });
  }
};

// update old pasword with new
const verifyOtp = async (req, res) => {
  const { otpNumber, email } = req.body;
  //  Sorts documents by createdAt in descending order (latest first).
  const otpData = await otpModel.findOne({ email }).sort({ createdAt: -1 });
  console.log("OtpData", otpData);
  if (!otpData) {
    return res.json({ success: false, message: "OTP expired!!" });
  }

  if (otpData.email == email && otpData.otp == otpNumber) {
    res.json({success:true,message:"Otp Matched Successfully!!"});
  } else {
    res.json({ success: false, message: "Invalid Otp" });
  }
};
const forgetPassword = async (req, res) => {
  const {email} = req.body;
  try {
    const password = await bcryptPassword(req.body.password);
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );
    if (updatedUser.password == password) {
      res.json({
        message: "Password Updated Successfully !!",
        success: true,
        updatedUser,
      });
    }
  } catch (err) {
    console.log("Error Updating password!!",err);
    res.json({success:false,message:"Error Updating Password!!"});
  }
};
module.exports = {
  loginUser,
  logoutUser,
  signupUser,
  verifyEmail,
  getUserData,
  forgetPassword,
  verifyExistingEmail,
  verifyOtp
};

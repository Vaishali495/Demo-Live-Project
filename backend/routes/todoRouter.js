const express = require("express");

const router = express.Router();

const authController = require("../controllers/AuthController");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/Authenticate");
const reportController = require("../controllers/reportController");
const assignedController = require("../controllers/assignedController");
const upload = require("../middlewares/Multer");
const {updateProfile} = require("../controllers/userController");

// all user details
router.get('/getUserData',authController.getUserData)
// verify login status of user 
router.get('/auth/checkToken',authMiddleware.checkLoginStatus);
// verify email for creating a new user and send otp
router.post("/verifyEmail",authController.verifyEmail);
// verify the otp and create a user
router.post("/signup",authController.signupUser);
// verify the credential and assign a token (authenticate for other routes)
router.post('/login',authMiddleware.isLogin,authController.loginUser); 
// add new task 
router.post("/addTask",authMiddleware.verifyUser,taskController.addTask);
// update an existing tasks
router.post("/updateTask",authMiddleware.verifyUser,taskController.updateTask);
// disable task (delete)
router.post("/deleteTask",authMiddleware.verifyUser,taskController.disableTask);
router.post("/addSection",authMiddleware.verifyUser,taskController.addNewSection);
// logout user by clearing its cookies
router.post("/logout",authController.logoutUser );   

router.post("/assignTask",assignedController.assignTask);
// get report 
router.get("/report",authMiddleware.verifyUser,reportController.generateReport);
// update section for drag and drop 
router.patch("/updateSection",authMiddleware.verifyUser,taskController.updateSection);
// get task assigned to you
router.get("/assignedtask",authMiddleware.verifyUser,assignedController.getAssigned);
// get list of user whom you can assigne task 
router.get("/getUserList",authMiddleware.verifyUser,assignedController.getUserList);
// update progress of assigned task 
router.patch("/updateProgress",authMiddleware.verifyUser,assignedController.updateAssignedTaskProgress);
// update the profile (image or username)
router.post("/updateProfile",authMiddleware.verifyUser,upload.single("image"),updateProfile);
// verify email exists in db for forget password
router.post("/verifyExistingEmail",authController.verifyExistingEmail);
// verify otp sent
router.post("/verifyOtp",authController.verifyOtp);
// match the otp and change the prev password with new 
router.patch ("/forgetPassword",authController.forgetPassword);

module.exports =router  
const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");
const router = express.Router();

// Get All users || Get
router.get("/all-users", getAllUsers);

// Create/Register Users || Post
router.post("/register", registerController);

// login user || Post
router.post("/login", loginController);

module.exports = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  currentUserInfo,
} = require("../controllers/usersController");
const chekTokenValidation = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/currentUser", chekTokenValidation, currentUserInfo);

module.exports = router;

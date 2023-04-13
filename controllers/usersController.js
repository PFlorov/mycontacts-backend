const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userIsAlreadyRegistered = await User.findOne({ email });
  if (userIsAlreadyRegistered) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (createUser) {
    res.status(201).json({ _id: createUser.id, email: createUser.email });
  } else {
    res.status(404);
    throw new Error("User data is not valid");
  }

  res.json({ message: "register the current user" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const user = await User.findOne({ email });

  const passwordCheck = await bcrypt.compare(password, user.password);

  if (user && passwordCheck) {
    const accesToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10h" }
    );

    res.status(200).json(accesToken);
  } else {
    res.status(401).json("password or username is required");
  }
});

const currentUserInfo = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUserInfo };

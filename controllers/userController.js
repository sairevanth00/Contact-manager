const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Method to Register users
 * @param {*} req
 * @param {*} res
 */
const registerUsers = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("User Not Found!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  console.log(`User created successfully ${user}`);
  res.json({ message: "Register the user" });
});

/**
 * Method to Login users
 * @param {*} req
 * @param {*} res
 */
const loginUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("All Fields are mandatory!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.name,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '24h' }
    );
    res.status(200).json({access_token: accessToken});
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

/**
 * Method to Current user
 * @param {*} req
 * @param {*} res
 */
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUsers, loginUsers, currentUser };

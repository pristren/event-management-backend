const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  console.log("registerUser ");
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(303).json({ message: "All field are required!" });
    }

    // check exasting user
    const exastingUser = await User.findOne({ email });
    if (exastingUser) {
      return res.status(403).json({
        message: "User already registered",
      });
    }
    // password hash
    const hashPassword = bcrypt.hashSync(password, 12);
    const createUser = {
      firstName,
      lastName,
      email,
      password: hashPassword,
      // phone,

      // thumbNail: thumbNail || null,
    };

    const user = await User.create(createUser);

    // write code for getting strong random bytes for token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(201).json({
      message: "User created successfully",
      data: {
        accessToken: token,
        user: user,
      },
    });
  } catch (err) {
    console.log("registerUser ", err);
    res.status(403).json({
      errorMessage: "There was a problem registering the user",
    });
  }
};

const loginUser = async (req, res) => {
  console.log("loginUser");
  try {
    const { email, password } = req.body;
    console.log("req.body ", { email, password });

    if (!email) {
      return res.status(303).json("Please provide an email");
    }
    if (!password) {
      return res
        .status(303)
        .json("Please provide a password. Password can not be empty!");
    }
    // check existing user
    const user = await User.findOne({ email });
    console.log("user ", user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // Check password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(403).json({
        error: "Invalid password!",
      });
    }
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    // response
    res.status(201).json({
      message: "Welcome back",
      data: {
        accessToken: token,
        user: user,
      },
    });
  } catch (err) {
    res.status(403).json({
      errorMessage: "There was a problem login the user",
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Assuming you want to update specific fields only
    const updates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      phone: req.body.phone,
      short_bio: req.body.short_bio,
      connect_account: req.body.connect_account,
      profile_images: req.body.profile_images,
      phone_verifiyed: req.body.phone_verifiyed,
      account_type: req.body.account_type,
    };

    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
};

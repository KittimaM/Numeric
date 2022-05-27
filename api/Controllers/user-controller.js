const jwt = require("jsonwebtoken");
const User = require("../Models/user-model");
const expressJWT = require("express-jwt");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    console.log("error");
  }
  res.json({ users: users });
};

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log("error");
  }

  if (existingUser) {
    console.log("error");
  }

  const createdUser = new User({
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log("error");
  }

  res.status(201).json({ user: createdUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log("error");
  }

  if (!existingUser) {
    console.log("error");
  }

  let existPassword;

  try {
    existPassword = await User.findOne({ password: password });
  } catch (err) {
    console.log("error");
  }

  if (!existPassword) {
    console.log("error");
  }

  let token;
  try {
    token = jwt.sign(
      {
        email: existingUser.email,
        password: existingUser.password,
      },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );
  } catch (err) {
    console.log("error");
  }

  res.json({
    email: existingUser.email,
    password: existingUser.password,
    token: token,
  });
};

const requireLogin = expressJWT({
  secret: process.env.JWT_SECRET || "admin-super-do",
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
exports.requireLogin = requireLogin;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cookieParser from "cookie-parser";
// import * as dotenv from "dotenv";

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User.js");

// dotenv.config();

// REGISTER USER
export const register = async (req, res) => {
  console.log("login attempted");
  try {
    const { firstName, lastName, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    const maxAge = 10*60
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {expiresIn: maxAge});
    res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge*1000})
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  console.log("login attempted");
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password." });
    const maxAge = 10*60
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: maxAge});
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

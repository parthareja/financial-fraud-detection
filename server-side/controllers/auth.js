import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import Cookies from "js-cookie";
// import * as dotenv from "dotenv";

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User.js");

// dotenv.config();

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { firstName: "", lastName: "", email: "", password: "" };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "The email you entered is already registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// REGISTER USER
export const register = async (req, res) => {
  console.log("login attempted");
  try {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    console.log(salt);
    console.log(password);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    const maxAge = 10 * 60;
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    res.cookie("jwtSignUp", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(201).json(savedUser);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);

    res.status(500).json({ errors });
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
    const maxAge = 10 * 60;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    delete user.password;
    res.cookie("jwtLogin", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(500).json({ errors });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwtLogin", "", { maxAge: 1 }); //////////////////////////////////// BAD WAY TO DO
  res.send("logged out");
};

// export const authTemp = async (req, res) => {
//   console.log("ok")}

// JWT PAYLOAD DECRYPT

function getPayloadFromToken(token) {
  const decodedToken = jwt.decode(token, {
    complete: true,
  });
  if (!decodedToken) {
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      `provided token does not decode as JWT`
    );
  }
  return decodedToken.payload;
}

//JWT TO USER_INFO
export const jwtGetUser = async (req, res, next) => {
  try {
    // console.log("fetching user data from jwt");
    let cookies = {};
    const cookiesArray = req.headers.cookie.split(";");
    cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
    });
    // res.json(cookies);

    const userjwt = cookies["jwtLogin"];
    console.log("JWT: ", userjwt);

    const payload = getPayloadFromToken(userjwt);

    const objectId = payload["_id"];
    // console.log("User id: ", objectId);
    // const userJson = await User.find({email:"test@test.com"});
    const userJson = await User.findById({ _id: objectId });
    // console.log("User by userId", userJson);
    res.json(userJson);
    next();
  } catch (err) {
    res.send(false);
  }
};

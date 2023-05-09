import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import Cookies from "js-cookie";
import QueryData from "../models/QueryData.js";

import User from "../models/User.js";
import { redisClient } from "../index.js";
// import * as dotenv from "dotenv";

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User.js");

const maxAge = 60 * 30;

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

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
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
    const maxAge = 60 * 30;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    delete user.password;
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(500).json({ errors });
  }
};

export const logout = async (req, res) => {
  var userjwt = 0;

  // try {
  //   let cookies = {};
  //   const cookiesArray = req.headers.cookie.split(";");
  //   cookiesArray.forEach((cookie) => {
  //     const [key, value] = cookie.trim().split("=");
  //     cookies[key] = value;
  //   });
  //   userjwt = cookies["jwt"];
  //   const token_key = `bl_${userjwt}`;
  //   await redisClient.set(token_key, userjwt);
  //   redisClient.expireAt(token_key, maxAge);
  //   res.send("logged out and token invalidated");
  // } catch (err) {
  //   console.log(err);
  //   res.cookie("jwt", "", { maxAge: 1 }); //////////////////////////////////// BAD WAY TO DO
  //   res.send(false);
  // }
  let cookies = {};
  const cookiesArray = req.headers.cookie.split(";");
  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });
  userjwt = cookies["jwt"];
  const token_key = `bl_${userjwt}`;
  console.log("token_key ", token_key);
  await redisClient.set(token_key, userjwt);
  console.log(await redisClient.get(token_key));
  redisClient.expire(token_key, maxAge);
  res.cookie("jwt", "", { maxAge: 1 }); //////////////////////////////////// BAD WAY TO DO
  res.send(false);
  console.log("logged out and token invalidated");
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

    const userjwt = cookies["jwt"];
    // console.log("JWT: ", userjwt);

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

export const saveQuery = async(req,res)=>{
  try{
    const query = new QueryData(req.body)
    await query.save()
    res.set("Access-Control-Allow-Origin", "*")
    res.send("Qery data stored successfully")
  }
  catch(err){
    console.log(err.message)
    res.send({msg:err})
  }
}

export const userTransactions = async(req, res)=>{
  try{
    const {user_id} = req.params
    const data = await QueryData.find({user_id :user_id});
    res.set("Access-Control-Allow-Origin", "*")
    res.json(data);
  }
  catch(err){
    res.send({'msg':err})
  }
}
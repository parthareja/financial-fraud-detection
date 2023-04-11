import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    max: [20, "Your first name should be less than 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    max: [20, "Your last name should be less than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    max: [50, "Your password should be less than 50 characters"],
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    min: [8, "Minimum password length is 8 characters"],
  },
});

// static method to login User

// userSchema.statics.login = async (email, password) => {
//     const user = await this.findOne({ email });
//     if (user) { 

//     }
//     throw Error("Incorrect email")
// };

const User = mongoose.model("User", userSchema);
export default User;

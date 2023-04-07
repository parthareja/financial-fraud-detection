import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true, max: 20},
        lastName: {type: String, required: true, max: 20},
        email: {type: String, required: true, max: 50, unique: true},
        password: {type: String, required: true, min: 8}
    }
)

const User = mongoose.model("User", UserSchema);
export default User;
 
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^[a-zA-Z0-9\s]{8,20}$/,
      console.log("Username to be validated:", username),
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: { type: String },
});

// Check if the user model is already there, and if not, we create it.
const User = models.User || model("User", UserSchema);

export default User;

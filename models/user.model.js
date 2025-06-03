import mongoose from "mongoose";
// ------------------ User Schema Definition ------------------
// Defines the structure for storing registered user data.
// Includes fields for name, email, and hashed password.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true, // Email is mandatory for login/registration
    unique: true,   // No two users can have the same email
    lowercase: true,
    trim: true, // Removes extra spaces from the email
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, 
});
// Creating the user model from the schema
const user = mongoose.model("User", userSchema);
// Exporting the model for use in controllers
export default user;

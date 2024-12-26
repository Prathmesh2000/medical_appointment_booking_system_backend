const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the user
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumbers: {   // currently not storing but in future if otp validation added required field
      type: [String], // Store phone numbers as an array of strings
      required: false,
      validate: {
        validator: function (value) {
          return value.every((num) => /\+?\d{10,}/.test(num)); // phone number validation
        },
        message: 'Phone number should be valid',
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'], //roles for case in future IMA need to be implemented 
      default: 'user',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

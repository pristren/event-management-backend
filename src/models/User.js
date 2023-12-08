const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String || Number,
      required: false,
      default: null
    },
    short_bio: {
      type: String || Number,
      required: false,
      default: null
    },
    connect_account: {
      type: String,
      required: false,
      default: ''
    },
    profile_images: {
      type: Array,
      required: false,
      default: []
    },
    phone_verifiyed: {
      type: Boolean,
      required: false,
      default: false
    },
    account_type: {
      type: String,
      required: false,
      default: 'Private'
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

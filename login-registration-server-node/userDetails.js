const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    bio: String,
    phoneNumber: String,
    taskCount:Number,
    tasks:[Map],
    images:[Map],
    imageCount:Number
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsScehma);

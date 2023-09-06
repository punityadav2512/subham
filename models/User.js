const mongoose = require("mongoose");

// const usernameSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  users: [
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

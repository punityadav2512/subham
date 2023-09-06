const User = require("../models/User");
const { hashPassword, comparePassword } =  require("../utils/auth");
const bcrypt = require("bcryptjs");
const AWS =  require("aws-sdk");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!username) return res.status(400).send("Username is required");
    if (!email || !password) {
      return res
        .status(400)
        .send("password is required and should be min 6 character long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("email aready exists");
    let usernameExist = await User.findOne({ users: {$elemMatch: {username}}}).exec();
    if (usernameExist) return res.status(400).send("username aready exists");

    //hash password
    const hashedPassword = await hashPassword(password);

    //register
    const user = new User({
      email,
      password: hashedPassword,
      users: [
        {
          username,
        },
      ],
    });

    await user.save();
    console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error !! Try again");
  }
};

exports.userLogin = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
         //validation
         const user = await User.findOne({ email }).exec(); //search in user if email already there
         if (!user) return res.status(400).send("No user Found");
    const userName = await User.findOne({ users: {$elemMatch: {username}}}).exec(); //search in usen if username already there

    if(!userName) return res.status(400).send("Wrong Username");
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("wrong password");

    const token = jwt.sign({email: user.email, username: user.username, _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });

      res.json(token, user);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error !! Try again");
      }

};

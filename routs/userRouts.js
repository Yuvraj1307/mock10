const express = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/usermodel");
var jwt = require("jsonwebtoken");

const userRout = express.Router();

userRout.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      let user = new userModel({ username, email, password: hash });
      await user.save();
      console.log(user);
      res.send({ msg: "user is added" });
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: "cant add user" });
  }
});

userRout.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ msg: "please signup first" });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result == true) {
        var token = jwt.sign({ userId: user._id,username:user.username }, "yuvraj");

        res.send({msg:"login success",token})
      }
    });
  } catch (error) {

    console.log(error)
    res.send({msg:"cant login"})
  }
});

module.exports = {
  userRout,
};

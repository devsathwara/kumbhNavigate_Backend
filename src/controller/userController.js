
const User =require("../models/User")
const bcrypt = require("bcrypt");
const {createJWTToken} =require("../utils/jwt");
const  {config} =require("../config/config");

 const register = (req , res) => {
  const { name, number, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter email and password",
    });
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    const user = new User({
      name:name,
      number:number,
      email:email,
      password: hash,
    });
    try {
      await user.save();
      const token = createJWTToken({name:user.name,id:user.id,email:user.email},  `${parseInt(config.env.jwt.expiresIn)}h`);
      res.status(201).json({
        message: "User created successfully",
        token: token
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });
};
 const login = (req , res) => {
    const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter email and password",
    });
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
    }
    const token = createJWTToken({name:user.name,id:user.id,email:user.email}, `${parseInt(config.env.jwt.expiresIn)}h`);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        res.status(200).json({
          message: "Login successfully",
          token: token
        });
      } else {
        res.status(401).json({
          message: "Invalid credentials",
        });
      }
    });
  });
};
module.exports={login,register};
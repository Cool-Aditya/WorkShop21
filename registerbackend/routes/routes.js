const express = require("express");
const router = express.Router();
const registerSchema = require("../models/RegisterModels");

//creating user
router.post("/register", async (req, res) => {
  const user = new registerSchema({
    fullname: req.body.fullname,
    email: req.body.email,
    mobileno: req.body.mobileno,
    password: req.body.password,
    confirmpwd: req.body.confirmpwd,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//getting all user
router.get("/register", async (req, res) => {
  try {
    const users = await registerSchema.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//login route
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz fill the data" });
    }
    const userLogin = await registerSchema.findOne({ email: email });
    console.log(userLogin);

    if (!userLogin) {
      res.status(400).json({ error: "Invalid Credentials" });
    } else {
      res.json({ message: "User Signin Sucessfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

//getting one user
router.get("/register/:id", getUser, (req, res) => {
  res.json(res.user);
});

async function getUser(req, res, next) {
  console.log(req);
  let user;
  try {
    user = await registerSchema.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;

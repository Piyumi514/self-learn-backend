const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
//Add user
router.post("/add-user", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User added successfully" });
});
module.exports = router;
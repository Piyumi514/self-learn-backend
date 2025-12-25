const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {console.log("awada",req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

  res.json({ token, message: "Login successful" });
});


module.exports = router;

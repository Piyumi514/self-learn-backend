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

//Get users
router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE USER
router.delete("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// UPDATE USER (Email only)
router.put("/update-user/:id", async (req, res) => {
  try {
    const { email } = req.body;

    await User.findByIdAndUpdate(req.params.id, { email });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});


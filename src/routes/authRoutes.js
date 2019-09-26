const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    return res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Email and password required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send({ error: "Email not found" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({userId: user._id}, "MY_SECRET_KEY");
    return res.send({token})
  } catch (err) {
    return res.status(401).send({ error: "Invalid password or email" });
  }
});
module.exports = router;

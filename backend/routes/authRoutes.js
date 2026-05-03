const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ message: "Registration successful!" });
    } catch (err) {
        res.status(400).json({ error: "Username is already taken." });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ message: "Login සාර්ථකයි!", userId: user._id });
    } else {
        res.status(401).json({ error: "Invalid Username or Password!" });
    }
});

module.exports = router;

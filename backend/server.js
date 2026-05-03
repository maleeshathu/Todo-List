const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//login regis
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes); //login regis end

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log("MongoDB එකට සාර්ථකව සම්බන්ධ වුණා! ✅"))
    .catch(err => console.log("සම්බන්ධ වීමේ දෝෂයක්: ❌", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server එක Port ${PORT} එකේ වැඩ කරනවා...`);
});
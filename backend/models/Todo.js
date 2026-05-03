const mongoose = require('mongoose');

// අපේ දත්ත ගබඩා වෙන්න ඕනේ හැඩය මෙතනින් තීරණය කරනවා
const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true // අනිවාර්යයෙන්ම task එකක් තිබිය යුතුයි
    },
    description: { 
        type: String,
        default: "" // description එකක් නැති වුණොත් හිස්ව තබනවා
    },
    completed: {
        type: Boolean,
        default: false // මුලින්ම task එකක් දාද්දී ඒක ඉවර නැති නිසා false වෙනවා
    },
    createdAt: {
        type: Date,
        default: Date.now // දත්තය ඇතුළත් කළ වෙලාව
    }
});

module.exports = mongoose.model('Todo', TodoSchema);
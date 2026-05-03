const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true 
    },
    description: { 
        type: String,
        default: "" 
    },
    completed: {
        type: Boolean,
        default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Todo', TodoSchema);

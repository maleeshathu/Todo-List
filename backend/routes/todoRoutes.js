const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 1. Home - සියලුම Task ලබා ගැනීම
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Pending Tasks - ඉවර නොකළ ඒවා පමණක්
router.get('/pending', async (req, res) => {
    const pending = await Todo.find({ completed: false });
    res.json(pending);
});

// 3. Completed Tasks - ඉවර කළ ඒවා පමණක්
router.get('/completed', async (req, res) => {
    const completed = await Todo.find({ completed: true });
    res.json(completed);
});

// 4. Task එකක් එකතු කිරීම (Add Task)
router.post('/add', async (req, res) => {
    const newTodo = new Todo({ 
        task: req.body.task,
        description: req.body.description // <-- මෙතන තමයි description එක save වෙන්නේ
    });
    try {
        await newTodo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 5. Task එකක් Update කිරීම (Update Task)
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id, 
            { 
                task: req.body.task, 
                description: req.body.description,
                completed: req.body.completed
            }, 
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 6. Task එකක් මකා දැමීම (Delete Task)
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Task Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
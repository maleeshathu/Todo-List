const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 1. Home 
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Pending Tasks 
router.get('/pending', async (req, res) => {
    const pending = await Todo.find({ completed: false });
    res.json(pending);
});

//Completed Tasks 
router.get('/completed', async (req, res) => {
    const completed = await Todo.find({ completed: true });
    res.json(completed);
});

// Add Task
router.post('/add', async (req, res) => {
    const newTodo = new Todo({ 
        task: req.body.task,
        description: req.body.description 
    });
    try {
        await newTodo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Update Task
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

//Delete Task
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Task Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Task from './models/Task.js';

const app = express();
app.use(express.json());

// mongodb connection

async function connectMongoDB() {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    if (conn) {
        console.log("Connected to mongoDB")
    }
}
connectMongoDB();

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'All good'
    })
})

// POST /task : to create task
app.post('/task', async (req, res) => {
    const { title, description } = req.body;

    const newTask = new Task({
        title: title,
        description: description
    })

    const savedTask = await newTask.save();

    res.json({
        success: true,
        message: 'Task Saved successfully',
        data: savedTask

    })

});

// GET /tasks : to fetched all task

// GET /task : to fetched specific task

// DELET /task/delet : to delete task

// PUT /task




const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log('listening on port ' + PORT)
})


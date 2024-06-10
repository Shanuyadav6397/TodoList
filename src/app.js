const express = require('express');
const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const Todo = require('./schema/todoSchema');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


// Create new todo
app.post('/todos', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            tags: req.body.tags
        });
        await todo.save();
        res.status(201).json(todo);
        console.log("Created");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//Read all the todos
app.get('/todos', async (req, res) => {
    try {
        const todo = await Todo.find();
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Read one todo by the todo id
app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update todo by using todo id 

app.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            todo.title = req.body.title !== undefined ? req.body.title : todo.title;
            todo.description = req.body.description !== undefined ? req.body.description : todo.description;
            todo.dueDate = req.body.dueDate !== undefined ? req.body.dueDate : todo.dueDate;
            todo.tags = req.body.tags !== undefined ? req.body.tags : todo.tags;
            await todo.save();
            res.json(todo);
            console.log("update sucessfull")
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Delete todo by the id

app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            await todo.deleteOne();
            res.status(204).send();
            console.log("delete sucessfull");
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: [5, "Todo atleast 5 characters"]
    },
    description: {
        type: String,
        require: true,
    },
    dueDate: {
        type: Date,
        require: true
    },
    tags: {
        type: String
    }
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
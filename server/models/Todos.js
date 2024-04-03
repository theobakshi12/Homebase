const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true
    }
})

const TodoModel = mongoose.model("todo", TodoSchema)
module.exports = TodoModel;
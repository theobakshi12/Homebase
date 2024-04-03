const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    }
})

const TodoModel = mongoose.model("todo", TodoSchema)
module.exports = TodoModel;
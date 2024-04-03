const express = require("express") 
const app = express()
const mongoose = require('mongoose')
const TodoModel = require('./models/Todos')

const cors = require('cors')

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://theobakshi12:potatoclient@cluster0.5vdz2ou.mongodb.net/homebase?retryWrites=true&w=majority&appName=Cluster0")

app.get("/getTodos", (req, res) => {
    TodoModel.find({}).then(docs => {
            res.json(docs)
        }).catch(err => {
            res.json(err)
        })
    }
)

app.post("/addTodo", async (req, res) => {
    const todo = req.body
    const newTodo = new TodoModel(todo)
    const savedTodo = await newTodo.save()

    res.json(savedTodo)
})

app.patch("/updateTodo/:_id", async (req, res) => {
    const _id = req.params._id
    const completed = req.body.completed

    const updatedTodo = await TodoModel.findByIdAndUpdate(_id, { completed }, { new: true });

    res.json(updatedTodo)
})

app.delete("/deleteTodo/:_id", async (req, res) => {
    const _id = req.params._id;
    
    try {
        const result = await TodoModel.findByIdAndDelete(_id);
        if (!result) {
            return res.status(404).send({ message: "Todo not found" });
        }
        res.status(200).send({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
});


app.listen(3001, () => {
    console.log("SERVER RUNS WELL")
})
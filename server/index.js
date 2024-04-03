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

app.patch("/updateTodo:id", async (req, res) => {
    const todo = req.body
    await todo.save()

    res.json(todo)
})

app.listen(3001, () => {
    console.log("SERVER RUNS WELL")
})
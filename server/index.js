const express = require("express") 
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')

const cors = require('cors')

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://theobakshi12:potatoclient@cluster0.5vdz2ou.mongodb.net/homebase?retryWrites=true&w=majority&appName=Cluster0")

app.get("/getUsers", (req, res) => {
    UserModel.find({}).then(docs => {
            res.json(docs)
        }).catch(err => {
            res.json(err)
        })
    }
)

app.post("/createUser", async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save()

    res.json(user)
})

app.listen(3001, () => {
    console.log("SERVER RUNS WELL")
})
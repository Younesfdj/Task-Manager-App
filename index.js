require("dotenv").config()
require('express-async-errors')
const cors = require('cors')
const express = require('express');
const app = express()
const tasks = require("./routes/taskRoutes")
const auth = require("./routes/userRoutes")
const connectDB = require("./db/connect")
const notFound = require('./middlwares/notFound')
const errorHandler = require('./middlwares/errHandler')
const { authUser } = require('./middlwares/authUser')

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.static('./view'))
app.use(express.json())
app.use('/api/v1/', auth)
app.use('/api/v1/', authUser, tasks)
app.use(notFound)
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is listening on port ${PORT}`))

    } catch (error) {
        console.log(error)
    }
}

start()
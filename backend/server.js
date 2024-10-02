require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const cookieParser = require('cookie-parser')
// const path = require('path')

const { app, server } = require('./socket/socket')
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')

const { connectToMongoDb } = require('./db/connectToMongoDb')

// const __dirname = path.resolve()

// middleware
app.use(express.json())
app.use(cookieParser())

// app.use(cors({
//     origin: "http://localhost:5173", // Adjust to your client origin
//     credentials: true,
// }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

// app.use(express.static(path.join(__dirname, "/frontend/dist")))

server.listen(process.env.PORT, () => {
    connectToMongoDb
    console.log('Listening on port', process.env.PORT);
})
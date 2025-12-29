import cors from 'cors'
import express from 'express'
import session from 'express-session'
import {authorizationRouter} from "./routes/authorization.js";
import {toDoItemRouter} from "./routes/toDoItem.js";

// express | port | secret
const app = express()
const PORT = 8000
const secret = 'apple99'

// cors | session | express.json() -> "req.body" access
app.use(cors())

app.use(express.json())

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// routes
app.use('/api/authorization', authorizationRouter)

app.use('/api/item', toDoItemRouter)

// final endpoint
app.use((req, res) => {
    res.status(404).json({error: 'Endpoint not found.'})
})

function runSever(server) {
    server.listen(PORT, () => {
        console.log(`The server is running on Port ${PORT}`)
    }).on('error', (err) => {
        console.error('Failed to start server:', err)
    })
}

runSever(app)
import cors from 'cors'
import './config/loadEnv.js'
import express from 'express'
import {createClient} from "redis";
import session from 'express-session'
import {RedisStore} from "connect-redis";
import {toDoItemRouter} from "./routes/toDoItem.js";
import {authorizationRouter} from "./routes/authorization.js";

// express | env | port | sessionSecret
const app = express()
const PORT = Number(process.env.PORT) || 8000
const sessionSecret = process.env.SESSION_SECRET

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000'

if (!sessionSecret || sessionSecret.length < 64) {
    console.error('Missing or invalid SESSION_SECRET environment variable.')
    process.exit(1)
}

if (isProduction) {
    app.set('trust proxy', 1)
}

// redis setup
const redisClient = createClient({
    url: process.env.REDIS_URL
})

redisClient.on('error', (err) => {
    console.error('Redis client error: ', err)
})

try {
    await redisClient.connect()
    console.log('Redis client connected')
} catch (err) {
    console.error('Failed to connect to Redis: ', err)
    process.exit(1)
}

const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sess:',
    ttl: 60 * 30
})

// cors | session | express.json() -> "req.body" access
app.use(cors({
    origin: clientOrigin,
    credentials: true
}))

app.use(express.json())

app.use(session({
    store: redisStore,
    name: 'sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    proxy: isProduction,
    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 1000 * 60 * 30
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
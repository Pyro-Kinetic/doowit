import cors from 'cors'
import './config/loadEnv.js'
import express from 'express'
import session from 'express-session'
import {redisStore} from './config/loadRedis.js';
import {toDoItemRouter} from "./routes/toDoItem.js";
import {authorizationRouter} from "./routes/authorization.js";

// express | env | port | sessionSecret
const app = express()
const PORT = Number(process.env.PORT) || 8000
const sessionSecret = process.env.SESSION_SECRET

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'

const clientOrigin = [process.env.CLIENT_ORIGIN, process.env.CLIENT_ORIGIN_2].filter(Boolean)
const uniqueOrigins = [...new Set(clientOrigin)]

if (!sessionSecret || sessionSecret.length < 64) {
    console.error('Missing or invalid SESSION_SECRET environment variable.')
    process.exit(1)
}

if (isProduction) {
    app.set('trust proxy', 1)
}

// cors | session | express.json() -> "req.body" access
// app.use(cors({
//     origin: clientOrigin,
//     credentials: true,
// }))

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        // Remove the trailing slash from the incoming origin
        const cleanOrigin = origin.replace(/\/$/, '');

        // Compare the cleaned origin with the unique origins
        if (uniqueOrigins.some(o => o.replace(/\/$/, '') === cleanOrigin)) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked for origin: ${origin}`);
            callback(null, false);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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
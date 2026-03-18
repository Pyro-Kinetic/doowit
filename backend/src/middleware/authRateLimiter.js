import {rateLimit} from 'express-rate-limit'
import {RedisStore} from 'rate-limit-redis'
import {redisClient} from '../config/loadRedis.js'

export const authRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 15,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    message: {
        message: 'Too many requests. Please try again in 5 minutes.'
    }
})
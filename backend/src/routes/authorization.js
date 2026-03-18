import express from "express";
import {requireSession} from "../middleware/requireSession.js";
import {getSession, login, logout, register} from "../controllers/authorizationControllers.js"
import {authRateLimiter} from "../middleware/authRateLimiter.js";

export const authorizationRouter = express.Router()

// register
authorizationRouter.post('/register', authRateLimiter, register)

// login
authorizationRouter.post('/login', authRateLimiter, login)

// getSession
authorizationRouter.get('/session', requireSession, getSession)

// logout
authorizationRouter.post('/logout', logout)
import express from "express";
import {requireSession} from "../middleware/requireSession.js";
import {register, login, getSession ,logout} from "../controllers/authorizationControllers.js"

export const authorizationRouter = express.Router()

// register
authorizationRouter.post('/register', register)

// login
authorizationRouter.post('/login', login)

// getSession
authorizationRouter.get('/session', requireSession, getSession)

// logout
authorizationRouter.post('/logout', logout)
import express from "express";
import {register, login, logout} from "../controllers/authorizationControllers.js"

export const authorizationRouter = express.Router()

// register
authorizationRouter.post('/register', register)

// login
authorizationRouter.get('/login', login)

// logout
authorizationRouter.get('/logout', logout)
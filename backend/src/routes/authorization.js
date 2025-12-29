import express from "express";
import {registerUser, login, logout} from "../controllers/authorizationControllers.js"

export const authorizationRouter = express.Router()

// register
authorizationRouter.get('/register', registerUser)

// login
authorizationRouter.get('/login', login)

// logout
authorizationRouter.get('/logout', logout)
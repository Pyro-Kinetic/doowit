import express from 'express'
import {requireSession} from '../middleware/requireSession.js'
import {addToDo, deleteToDo, editToDo, getToDo, markToDoComplete} from "../controllers/toDoItemControllers.js";

export const toDoItemRouter = express.Router()

// getToDo
toDoItemRouter.get('/get', requireSession, getToDo)

// addToDo
toDoItemRouter.post('/add', requireSession, addToDo)

// editToDo
toDoItemRouter.post('/edit', requireSession, editToDo)

// deleteToDo
toDoItemRouter.post('/delete', requireSession, deleteToDo)

// markToDoComplete
toDoItemRouter.post('/mark', requireSession, markToDoComplete)


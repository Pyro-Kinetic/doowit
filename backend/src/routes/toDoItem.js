import express from 'express'
import {addToDo, deleteToDo, editToDo, getToDo, markToDoComplete} from "../controllers/toDoItemControllers.js";

export const toDoItemRouter = express.Router()

// getToDo
toDoItemRouter.get('/get', getToDo)

// addToDo
toDoItemRouter.post('/add', addToDo)

// editToDo
toDoItemRouter.get('/edit', editToDo)

// deleteToDo
toDoItemRouter.get('/delete', deleteToDo)

// markToDoComplete
toDoItemRouter.get('/mark', markToDoComplete)


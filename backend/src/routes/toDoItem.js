import express from 'express'
import {addToDo, deleteToDo, editToDo, getToDo, markToDoComplete} from "../controllers/toDoItemControllers.js";

export const toDoItemRouter = express.Router()

// getToDo
toDoItemRouter.get('/get', getToDo)

// addToDo
toDoItemRouter.post('/add', addToDo)

// editToDo
toDoItemRouter.post('/edit', editToDo)

// deleteToDo
toDoItemRouter.post('/delete', deleteToDo)

// markToDoComplete
toDoItemRouter.post('/mark', markToDoComplete)


import express from 'express'
import {addToDo, editToDo, deleteToDo, markToDoComplete, getToDo} from "../controllers/toDoItemControllers.js";

export const toDoItemRouter = express.Router()

// getToDo
toDoItemRouter.get('/get', getToDo)

// addToDo
toDoItemRouter.get('/add', addToDo)

// editToDo
toDoItemRouter.get('/edit', editToDo)

// deleteToDo
toDoItemRouter.get('/delete', deleteToDo)

// markToDoComplete
toDoItemRouter.get('/mark', markToDoComplete)


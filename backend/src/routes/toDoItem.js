import express from 'express'
import {addToDo, editToDo, deleteToDo, markToDoComplete} from "../controllers/toDoItemControllers.js";

export const toDoItemRouter = express.Router()

// addToDo
toDoItemRouter.get('/add', addToDo)

// editToDo
toDoItemRouter.get('/edit', editToDo)

// deleteToDo
toDoItemRouter.get('/delete', deleteToDo)

// markToDoComplete
toDoItemRouter.get('/mark', markToDoComplete)


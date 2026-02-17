import {getDBConnection} from "../db/connect.js";

export async function getToDo(req, res) {
    try {
        const connection = await getDBConnection();

        const userId = req.session.userId;
        const query = 'SELECT id, completed, priority, title, description FROM todo WHERE user_id = ?';

        const [rows] = await connection.execute(query, [userId]);
        console.log(rows)
        // console logging rows
        // console logging rows

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch to-dos.'});
    }
}

export async function addToDo(req, res) {
    res.status(201).json({message: 'To do item successfully added.'})
}

export async function editToDo(req, res) {
    res.status(201).json({message: 'To do item successfully edited.'})
}

export async function deleteToDo(req, res) {
    res.status(201).json({message: 'To do item successfully deleted.'})
}

export async function markToDoComplete(req, res) {
    res.status(201).json({message: 'To do item successfully marked completed.'})
}


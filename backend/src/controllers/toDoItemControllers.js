import {getDBConnection} from "../db/connect.js";

export async function getToDo(req, res) {
    try {
        const connection = await getDBConnection();

        const userId = req.session.userId;
        const query = 'SELECT id, completed, priority, title, description FROM todo WHERE user_id = ? ORDER BY created_at DESC';

        const [rows] = await connection.execute(query, [userId]);

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch to-dos.'});
    }
}

export async function addToDo(req, res) {
    const {id, priority, title, description} = req.body;

    if (!id || !priority || !title || !description) {
        return res.status(400).json({message: 'Missing required fields.'})
    }

    try {
        const connection = await getDBConnection();

        const query = 'INSERT INTO todo (user_id, id, completed, priority, title, description) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [req.session.userId, id, false, priority, title, description];

        await connection.execute(query, values);

        res.status(201).json({message: 'To do item successfully added.'})

    } catch (error) {
        return res.status(500).json({message: 'Failed to add to-do item.'})
    }
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


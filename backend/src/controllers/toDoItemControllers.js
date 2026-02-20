import {getDBConnection} from "../db/connect.js";

export async function getToDo(req, res) {
    try {
        const connection = await getDBConnection();

        const userId = req.session.userId;
        const query = 'SELECT id, completed, priority, title, description FROM todo WHERE user_id = ? ORDER BY updated_at DESC';

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
    const {id, title, priority, description} = req.body;

    if (!id || !title || !priority || !description) {
        return res.status(400).json({message: 'Missing required fields.'})
    }

    try {
        const connection = await getDBConnection();

        const query = 'UPDATE todo SET title = ?, priority = ?, description = ?, updated_at = NOW() WHERE id = ? AND user_id = ?';
        const values = [title, priority, description, id, req.session.userId];

        await connection.execute(query, values);

        res.status(201).json({message: 'To do item successfully edited.'})

    } catch (error) {
        return res.status(500).json({message: 'Failed to edit to-do item.'})
    }
}

export async function deleteToDo(req, res) {
    const id = req.body.id

    if (!id) return res.status(400).json({message: 'Missing required fields.'})

    try {
        const connection = await getDBConnection();

        const query = 'DELETE FROM todo WHERE id = ? AND user_id = ?';
        const values = [id, req.session.userId];

        await connection.execute(query, values);

        res.status(201).json({message: 'To do item successfully deleted.'})

    } catch (error) {
        return res.status(500).json({message: 'Failed to delete to-do item.'})
    }
}

export async function markToDoComplete(req, res) {
    res.status(201).json({message: 'To do item successfully marked completed.'})
}


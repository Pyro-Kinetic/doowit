import {getDBConnection} from "../db/connect.js";

export async function getToDo(req, res) {
    try {
        const connection = await getDBConnection();

        //query
        // const userId = req.session.userId;
        // const query = 'SELECT id, completed, priority, title, description FROM todo WHERE user_id = ? ORDER BY completed ASC, updated_at DESC';
        //
        // const [rows] = await connection.execute(query, [userId]);
        const userId = req.session.userId;
        const query = 'SELECT id, completed, priority, title, description FROM todo WHERE user_id = $1 ORDER BY completed ASC, updated_at DESC';

        const result = await connection.query(query, [userId]);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(`Error fetching to-dos: `, error);
        res.status(500).json({message: 'Failed to fetch to-dos.'});
    }
}

export async function addToDo(req, res) {
    const {id, priority, title, description} = req.body;

    if (!id || !priority || !title || !description) {
        return res.status(400).json({message: 'Missing required fields.'})
    }

    try {
        // query
        // const connection = await getDBConnection();
        //
        // const query = 'INSERT INTO todo (user_id, id, completed, priority, title, description) VALUES (?, ?, ?, ?, ?, ?)';
        // const values = [req.session.userId, id, false, priority, title, description];
        //
        // await connection.execute(query, values);
        const connection = await getDBConnection();

        const query = 'INSERT INTO todo (user_id, id, completed, priority, title, description) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [req.session.userId, id, false, priority, title, description];

        await connection.query(query, values);

        res.status(201).json({message: 'To do item successfully added.'})

    } catch (error) {
        console.error(`Error adding to-do item: `, error);
        return res.status(500).json({message: 'Failed to add to-do item.'})
    }
}

export async function editToDo(req, res) {
    const {id, title, priority, description, completed} = req.body;

    if (!id || !title || !priority || !description || completed === null) {
        return res.status(400).json({message: 'Missing required fields.'})
    }

    try {
        // query
        // const connection = await getDBConnection();
        //
        // const query = 'UPDATE todo SET title = ?, priority = ?, description = ?, completed = ?, updated_at = NOW() WHERE id = ? AND user_id = ?';
        // const values = [title, priority, description, completed, id, req.session.userId];
        //
        // await connection.execute(query, values);
        const connection = await getDBConnection();

        const query = 'UPDATE todo SET title = $1, priority = $2, description = $3, completed = $4, updated_at = NOW() WHERE id = $5 AND user_id = $6';
        const values = [title, priority, description, completed, id, req.session.userId];

        await connection.query(query, values);

        res.status(201).json({message: 'To do item successfully edited.'})

    } catch (error) {
        console.error('Error Editing to-do item: ', error);
        return res.status(500).json({message: 'Failed to edit to-do item.'})
    }
}

export async function deleteToDo(req, res) {
    const id = req.body.id

    if (!id) return res.status(400).json({message: 'Missing required fields.'})

    try {
        // query
        // const connection = await getDBConnection();
        //
        // const query = 'DELETE FROM todo WHERE id = ? AND user_id = ?';
        // const values = [id, req.session.userId];
        //
        // await connection.execute(query, values);
        const connection = await getDBConnection();

        const query = 'DELETE FROM todo WHERE id = $1 AND user_id = $2';
        const values = [id, req.session.userId];

        await connection.query(query, values);

        res.status(201).json({message: 'To do item successfully deleted.'})

    } catch (error) {
        console.error('Error Deleting to-do item: ', error);
        return res.status(500).json({message: 'Failed to delete to-do item.'})
    }
}

export async function markToDoComplete(req, res) {
    const {id, priority, completed} = req.body

    if (!id || !priority || completed === undefined || completed === null) return res.status(400).json({message: 'Missing required fields.'})

    try {
        // query
        // const connection = await getDBConnection();
        //
        // const query = 'UPDATE todo SET completed = ?, priority = ?, updated_at = NOW() WHERE id = ? AND user_id = ?';
        // const values = [completed, priority, id, req.session.userId];
        //
        // await connection.execute(query, values);
        const connection = await getDBConnection();

        const query = 'UPDATE todo SET completed = $1, priority = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4';
        const values = [completed, priority, id, req.session.userId];

        await connection.query(query, values);

        res.status(201).json({message: 'To do item successfully marked completed.'})

    } catch (error) {
        console.error('Error marking to-do item complete: ', error);
        return res.status(500).json({message: 'Failed to mark to-do item complete.'})
    }
}


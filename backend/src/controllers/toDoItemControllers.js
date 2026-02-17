export async function getToDo(req, res) {
    console.log(req.session.userId)
    res.status(200).json({message: 'To do item successfully retrieved.'})
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


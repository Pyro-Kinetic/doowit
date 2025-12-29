export async function registerUser(req, res) {
    res.status(201).json({message: 'Registration successful.'})
}

export async function login(req, res){
    res.status(200).json({message: 'You successfully logged in.'})
}

export async function logout(req, res){
    res.status(200).json({message: 'You successfully logged out.'})
}
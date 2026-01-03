export async function register(req, res) {
    const {email, password, confirmPassword} = req.body
    console.log('email:', email)
    console.log('password:', password)
    console.log('confirmPassword:', confirmPassword)

    res.status(201).json({message: 'Registration successful.'})
}

export async function login(req, res){
    res.status(200).json({message: 'You successfully logged in.'})
}

export async function logout(req, res){
    res.status(200).json({message: 'You successfully logged out.'})
}
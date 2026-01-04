export async function register(req, res) {
    const {email, password, confirmPassword} = req.body
    console.log('email:', email)
    console.log('password:', password)
    console.log('confirmPassword:', confirmPassword)
    console.log('Request body:', req.body)

    res.status(201).json({message: 'Thanks for signing up!'})
}

export async function login(req, res){
    res.status(200).json({message: 'All set! Ready to go.'})
}

export async function logout(req, res){
    res.status(200).json({message: 'Goodbye!'})
}
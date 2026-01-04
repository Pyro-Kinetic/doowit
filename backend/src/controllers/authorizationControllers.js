import validator from 'validator'

export async function register(req, res) {
    const {email, password, confirmPassword} = req.body
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/

    console.log('email:', email)
    console.log('password:', password)
    console.log('confirmPassword:', confirmPassword)
    console.log('Request body:', req.body)

    if (!email) {
        return res.status(400).json({message: "Please enter your email"})
    }

    if (!password) {
        return res.status(400).json({message: "Please enter your password"})
    }

    if (password !== confirmPassword) {
        return res.status(400).json({message: "Passwords do not match"})
    }

    const isPasswordValid = regex.test(password)
    if (!isPasswordValid) {
        return res.status(400).json({message: "Password must be between 8 and 16 characters long with no spaces and contain at least one uppercase letter, one lowercase letter, one number, and one special character"})
    }

    const isEmailValid = validator.isEmail(email)
    if (!isEmailValid) {
        return res.status(400).json({message: "Invalid email format"})
    }


    res.status(201).json({message: 'Thanks for signing up!'})
}

export async function login(req, res) {
    res.status(200).json({message: 'All set! Ready to go.'})
}

export async function logout(req, res) {
    res.status(200).json({message: 'Goodbye!'})
}
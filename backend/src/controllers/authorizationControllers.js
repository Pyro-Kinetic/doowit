import bcrypt from 'bcryptjs'
import validator from 'validator'
import {getDBConnection} from "../db/connect.js";

export async function register(req, res) {
    const {email, password, confirmPassword} = req.body
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/

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

    try {
        // database connector
        const connection = await getDBConnection()

        // query checks if this user exists
        const getUserQuery = 'SELECT id FROM users WHERE email = ?'
        const [rows] = await connection.execute(getUserQuery, [email])

        // deny registration if user exists
        if (rows.length > 0) {
            connection.end()
            return res.status(400).json({message: 'User with this email already exists'})
        }

        // password hash
        const hashedPassword = await bcrypt.hash(password, 10)

        // query inserts new user
        const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)'
        await connection.execute(insertUserQuery, [email, hashedPassword])

        connection.end()
        res.status(201).json({message: 'Thanks for signing up!'})

    } catch (error) {
        console.error('Error during registration:', error)
        return res.status(500).json({message: 'An error occurred during registration. Please try again later.'})
    }
}

export async function login(req, res) {
    res.status(200).json({message: 'All set! Ready to go.'})
}

export async function logout(req, res) {
    res.status(200).json({message: 'Goodbye!'})
}
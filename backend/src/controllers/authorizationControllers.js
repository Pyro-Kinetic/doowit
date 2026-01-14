import bcrypt from 'bcryptjs'
import {promisify} from 'util'
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
        const db = await getDBConnection()

        // query checks if this user exists
        // might add to utils function
        const getUserQuery = 'SELECT id FROM users WHERE email = ?'
        const [rows] = await db.execute(getUserQuery, [email])

        // deny registration if user exists
        if (rows.length > 0) {
            return res.status(400).json({message: 'User with this email already exists'})
        }

        // password hash
        const hashedPassword = await bcrypt.hash(password, 10)

        // query inserts new user
        const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)'
        await db.execute(insertUserQuery, [email, hashedPassword])

        res.status(201).json({message: 'Thanks for signing up!', isLoggedIn: false})

    } catch (error) {
        console.error('Error during registration: ', error)
        return res.status(500).json({message: 'An error occurred during registration. Please try again later.'})
    }
}

export async function login(req, res) {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({message: 'Email and password are required'})
    }

    try {
        const db = await getDBConnection()

        // query checks if the user exists, might add to utils function...
        const getUserQuery = 'SELECT id FROM users WHERE email = ?'
        const [idRows] = await db.execute(getUserQuery, [email])

        // return if the user does not exist
        if (idRows.length <= 0) {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        // query gets the user's hashed password
        const getPassAndIdQuery = 'SELECT password as storedHash, id as storedId FROM users WHERE email = ?'
        const [passwordAndIdRows] = await db.execute(getPassAndIdQuery, [email])

        // bcrypt check if passwords match
        const {storedHash, storedId} = passwordAndIdRows[0]
        const isPasswordValid = await bcrypt.compare(password, storedHash)

        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid email or password'})
        }

        // create a new session for the user
        const regenerate = promisify(req.session.regenerate).bind(req.session)
        const save = promisify(req.session.save).bind(req.session)

        await regenerate()
        req.session.userId = storedId
        await save()

        res.status(200).json({message: 'All set! Ready to go.', isLoggedIn: true})

    } catch (error) {
        console.error('Error during login: ', error)
        return res.status(500).json({message: 'An error occurred during login. Please try again later.'})
    }
}

export async function logout(req, res) {
    const destroy = promisify(req.session.destroy).bind(req.session)

    try {
        await destroy()
        res.clearCookie('connect.sid')
        res.status(200).json({message: 'Goodbye!', isLoggedIn: false})
    } catch (error) {
        console.error('Error during logout: ', error)
        res.status(500).json({message: 'An error occurred during logout. Please try again.'})
    }
}
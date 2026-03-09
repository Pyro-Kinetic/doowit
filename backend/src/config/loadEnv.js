import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envFile = process.env.NODE_ENV
    ? path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`)
    : path.resolve(__dirname, '../../.env.development')

dotenv.config({path: envFile})
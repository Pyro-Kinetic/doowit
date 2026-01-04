import mysql from 'mysql2/promise';

export async function getDBConnection() {
    return (
        await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '@MySQL@ccount123!',
            database: 'doowit'
        })
    )
}
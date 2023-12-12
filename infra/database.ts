import mySql from "mysql2";

export const connection = mySql
    .createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
    .promise();

async function query<T>(query: string, ...args: any[]) {
    const result = await connection.query(query, args);

    return result[0] as T;
}

export const databaseClient = { query };

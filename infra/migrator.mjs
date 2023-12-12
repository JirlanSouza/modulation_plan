import dotenv from "dotenv";
import mySql from "mysql2";
import Migration from "mysql2-migrations";

dotenv.config();
const connection = mySql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const migration = new Migration.init();
migration.conn = connection;
migration.root_path = "infra/";
migration.migrations_folder = "migrations";
migration.name_table_migrations = "migrations";

migration.start();

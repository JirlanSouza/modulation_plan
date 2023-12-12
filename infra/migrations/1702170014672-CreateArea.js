const migration = {
    up: (conn, cb) =>
        conn.query(
            `
            CREATE TABLE areas (
                id varchar(36) PRIMARY KEY,
                name varchar(30) NOT NULL UNIQUE
            )
        `,
            cb
        ),
    down: (conn, cb) => conn.query(`DROP TABLE areas`, cb),
};

export default migration;

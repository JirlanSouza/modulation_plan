const migration = {
    up: (conn, cb) =>
        conn.query(
            `
            CREATE TABLE sub_areas (
                id varchar(36) PRIMARY KEY,
                name varchar(30) NOT NULL UNIQUE,
                area_id varchar(36),
                FOREIGN KEY (area_id) REFERENCES areas(id)
            )
        `,
            cb
        ),
    down: (conn, cb) => conn.query(`DROP TABLE sub_areas`, cb),
};

export default migration;

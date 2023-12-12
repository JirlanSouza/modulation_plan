const migration = {
    up: (conn, cb) =>
        conn.query(
            `
            CREATE TABLE modulation_plan_hours (
                id varchar(36) PRIMARY KEY,
                hour tinyint NOT NULL,
                state bit(1) NOT NULL,
                comment varchar(50),
                date_id varchar(36) NOT NULL,
                CONSTRAINT UC_date_hour UNIQUE (hour, date_id),
                FOREIGN KEY (date_id) REFERENCES modulation_plan_date(id)
            )
        `,
            cb
        ),
    down: (conn, cb) => conn.query(`DROP TABLE modulation_plan_hours`, cb),
};

export default migration;

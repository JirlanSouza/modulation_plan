const migration = {
    up: (conn, cb) =>
        conn.query(
            `
            CREATE TABLE modulation_plan_date (
                id varchar(34) PRIMARY KEY,
                date date NOT NULL,
                sub_area_id varchar(36) NOT NULL,
                CONSTRAINT UC_sub_area_date UNIQUE (date, sub_area_id),
                FOREIGN KEY (sub_area_id) REFERENCES sub_areas(id)
            )
        `,
            cb
        ),
    down: (conn, cb) => conn.query(`DROP TABLE modulation_plan_date`, cb),
};

export default migration;

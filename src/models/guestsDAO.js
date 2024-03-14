const db = require("../../config/dbConnection");
const logger = require("../../config/logger");

class GuestsDAO {
    table = "guests";

    constructor() {
        this.conn = db.pool;
    }

    saveDAO = async (guests) => {
        const fields = Object.keys(guests).join(', ');
        const placeholders = Object.keys(guests).map(key => `?`).join(', ');

        const sql = `INSERT INTO ${this.table} (${fields}) VALUES (${placeholders})`;
        const values = Object.values(guests);

        try {
            return await this.conn.query(sql, values);
        } catch (error) {
            logger.log(`error`,`Falha ao inserir o convidado no banco: ${error.code}`);
            throw new Error(error);
        }
    }
}

module.exports = new GuestsDAO();
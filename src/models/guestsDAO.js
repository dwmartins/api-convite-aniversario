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

    updateDAO = async (guests) => {
        const guestsId = guests.id;
        delete guests.id;
        const fields = Object.keys(guests).join(' = ?, ') + ' = ?';
        
        const sql = `UPDATE ${this.table} SET ${fields} WHERE id = ?`;
        let values = [...Object.values(guests), guestsId];

        try {
            await this.conn.query(sql, values);
            return true;
        } catch (error) {
            logger.log(`error`,`Falha ao atualizar o convidado no banco: ${error.code}`);
            throw new Error(error);
        }
    }

    findAll = async () => {
        const sql = `SELECT * FROM ${this.table}`;

        try {
            const result = await this.conn.query(sql);
            return result[0];
        } catch (error) {
            logger.log(`error`, `Falha ao buscar os convidados: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = new GuestsDAO();
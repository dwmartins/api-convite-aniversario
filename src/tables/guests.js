const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helperDate = require("../utilities/helpersDate");

class NewTablePeoples {
    async guests() {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS guests (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) NOT NULL,
                    number_people INT,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );`
            );
        } catch (error) {
            logger.log(`error`, `Falha ao criar a tabela (guests): ${error}`);
        }
    }

    async createAll() {
        console.log(`${helperDate.getFullDateTime()} - Criando tabela de (guests)...`)
        await this.guests();
    }
}

module.exports = new NewTablePeoples();
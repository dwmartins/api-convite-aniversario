const db = require("../../config/dbConnection");
const logger = require("../../config/logger");
const helperDate = require("../utilities/helpersDate");

class NewTablePeoples {
    async peoples() {
        try {
            await db.pool.query(`
                CREATE TABLE IF NOT EXISTS peoples (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) NOT NULL,
                    number_people INT,
                    createdAt DATETIME,
                    updatedAt DATETIME
                );`
            );
        } catch (error) {
            logger.log(`error`, `Falha ao criar a tabela (peoples): ${error}`);
        }
    }

    async createAll() {
        console.log(`${helperDate.getFullDateTime()} - Criando tabela de (peoples)...`)
        await this.peoples();
    }
}

module.exports = new NewTablePeoples();
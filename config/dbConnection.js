const config = require("./configDB");
const mysql2 = require("mysql2/promise");
const logger = require("./logger");

class DBConnection {
    constructor() {
        this.pool = mysql2.createPool(config.db);
        this.checkConnection();
    }

    async checkConnection() {
        try {
            await this.pool.query('SELECT 1+1');
        } catch (error) {
            this.getErrorConnection(error.code);
        }
    }

    getErrorConnection(error) {
        switch (error) {
            case 'ER_BAD_DB_ERROR':
                logger.log('error', `O banco de dados '${config.db.database}' não foi encontrado.`);
                break;

            case 'ER_ACCESS_DENIED_ERROR':
                logger.log('error', `Credenciais incorretas para conexão com o banco de dados.`);
                break;

            case 'ER_CONN_REFUSED':
                logger.log('error', `O servidor MySQL não está em execução ou a portabilidade não está disponível.`);
                break;

            case 'ER_UNKNOWN_ERROR':
                logger.log('error',  `Ocorreu um erro inesperado no servidor MySQL.`);
                break;
            default:
                logger.log('error',  `Ocorreu um erro inesperado no servidor MySQL.`);
                break;
        }
    }
}

module.exports = new DBConnection();
const logger = require("./logger");
const helper = require("../src/utilities/helpersDate");
const tablePeoples = require("../src/tables/peoples");

class CreateTables {
    async peoples() {
        await tablePeoples.createAll();
    }

    createAll = async () => {
        console.log(`${helper.getFullDateTime()} - Preparando a criação das Tabelas... `);
        await this.peoples();
        console.log(`${helper.getFullDateTime()} - Finalizando a criação das tabelas. `);
    }
}

const tables = new CreateTables;
tables.createAll();
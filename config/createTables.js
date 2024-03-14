const logger = require("./logger");
const helper = require("../src/utilities/helpersDate");
const tableGuests = require("../src/tables/guests");

class CreateTables {
    guests = async () => {
        await tableGuests.createAll();
    }

    createAll = async () => {
        console.log(`${helper.getFullDateTime()} - Preparando a criação das Tabelas... `);
        await this.guests();
        console.log(`${helper.getFullDateTime()} - Finalizando a criação das tabelas. `);
    }
}

const tables = new CreateTables;
tables.createAll();
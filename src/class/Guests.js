const guestsDAO = require("../models/guestsDAO");

class Guests {
    constructor (guests) {
        this.id             = guests.id;
        this.name           = guests.name;
        this.number_people  = guests.number_people;
        this.createdAt      = guests.createdAt;
        this.updatedAt      = guests.updatedAt;
    }

    getId = () => {
        return this.id;
    }

    getName = () => {
        return this.name;
    }

    setName = (name) => {
        this.name = name;
    }

    getCreatedAt = () => {
        return this.createdAt;
    }

    getUpdatedAt = () => {
        return this.updatedAt;
    }

    save = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        const response  = await guestsDAO.saveDAO(plainObject);
        this.id = response[0].insertId;
        
        return response;
    }

    update = async () => {
        let plainObject = Object.fromEntries(
            Object.entries(this).filter(([key, value]) => typeof value !== 'function')
        );

        delete plainObject.createdAt;
        delete plainObject.updatedAt;

        return await guestsDAO.updateDAO(plainObject);
    }
}

module.exports = Guests;
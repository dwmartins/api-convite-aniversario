const guestsDAO = require("../models/guestsDAO");

class Guests {
    constructor (guests) {
        this.id             = guests.id;
        this.name           = guests.name;
        this.escorts        = guests.escorts;
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

    getEscorts = () => {
        return this.escorts
    }

    setEscorts = (escorts) => {
        this.escorts = escorts;
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

    delete = async () => {
        return await guestsDAO.deleteDAO(this.getId());
    }
}

module.exports = Guests;
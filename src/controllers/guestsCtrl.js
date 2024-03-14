const Guests = require("../class/Guests");
const guestsDAO = require("../models/guestsDAO");

class GuestsCtrl {

    new = async (req, res) => {
        try {
            const guests = new Guests(req.body);
            await guests.save();
            return this.sendResponse(res, 201, {success: "Confirmação de presença salva com sucesso."});
        } catch (error) {
            return this.sendResponse(res, 500, {erro: `Falha ao salvar sua confirmação de presença.`});
        }
    } 

    list = async (req, res) => {
        try {
            const guests = await guestsDAO.findAll();
            return this.sendResponse(res, 200, guests);

        } catch (error) {
            return this.sendResponse(res, 500, {erro: `Falha ao buscar os convidados.`});
        }
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new GuestsCtrl();
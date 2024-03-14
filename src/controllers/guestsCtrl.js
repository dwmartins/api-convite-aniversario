const Guests = require("../class/Guests");
const guestsDAO = require("../models/guestsDAO");
const helperString = require("../utilities/helperString");
const validator = require("../utilities/validator");
const sendEmailCtrl  = require("./sendEmailCtrl");

class GuestsCtrl {

    new = async (req, res) => {
        try {
            const guests = new Guests(req.body);

            if(!validator.validText(guests.getName())) {
                return this.sendResponse(res, 400, {error: "O nome fornecido é invalido."})
            }

            guests.setName(helperString.firstLetterCapitalizedAll(guests.getName()));
            await guests.save();
            sendEmailCtrl.newGuests(guests.getName(), guests.getEscorts());

            return this.sendResponse(res, 201, {success: "Confirmação de presença salva com sucesso."});
        } catch (error) {
            return this.sendResponse(res, 500, {erro: `Falha ao salvar sua confirmação de presença.`});
        }
    } 

    update = async (req, res) => {
        try {
            const guests = new Guests(req.body);

            if(!validator.validText(guests.getName())) {
                return this.sendResponse(res, 400, {error: "O nome fornecido é invalido."})
            }

            guests.setName(helperString.firstLetterCapitalizedAll(guests.getName()));

            await guests.update();
            return this.sendResponse(res, 201, {success: "Convidado atualizado com sucesso."});
        } catch (error) {
            return this.sendResponse(res, 500, {erro: `Falha ao atualizar o convidado`});
        }
    }

    delete = async (req, res) => {
        try {
            const guestsId = parseInt(req.params.id);
            await guestsDAO.deleteDAO(guestsId);
            return this.sendResponse(res, 201, {success: "Convidado deletado com sucesso."});
        } catch (error) {
            return this.sendResponse(res, 500, {erro: `Falha ao deletar o convidado`});
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
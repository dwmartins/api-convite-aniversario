const Nodemailer = require('../services/nodeMailer');
const fs = require('fs');
const helperDate = require("../utilities/helpersDate");
const logger = require("../../config/logger");

class SendEmailCtrl {

    constructor() {
        this.sendEmail = new Nodemailer();
    }

    newGuests = (name, escorts) => {
        const formatEmail = "newPeople.html";
        fs.readFile('src/formatEmail/newGuests.html', 'utf8', (err, data) => {
            if (err) {
                logger.log(`error`,`Falha ao ler o formato de e-mail (${formatEmail}): ${err}`);
                return;
            }

            const modifiedEmail = data.replace('$userName', name)
                .replace('$escorts', escorts ? escorts : "Não")
                .replace('$dateTime', helperDate.getFullDateTime())

            const subject = "Confirmação de presença recebida";
            this.sendEmail.sendEmail(subject, modifiedEmail);
        });
    };
}

module.exports = new SendEmailCtrl();
require('dotenv').config();
const nodemailer = require('nodemailer');
const logger = require("../../config/logger");

class Nodemailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SENHA
            }
        });
    };

    sendEmail(subject, text) {
        const mailOptions = {
            from: `Convite de aniversário`,
            to: process.env.EMAIL_DEST,
            subject: subject,
            html: text
        }

        this.transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                logger.log(`error`,`Falha ao enviar o e-mail para (${to}). Erro: ${error.code}`);
            } 

            return true;
        });
    };
}

module.exports = Nodemailer;
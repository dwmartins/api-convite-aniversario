const validator = require("validator");

class Validator {
    validText = (text) => {
        return validator.isAlpha(text, 'pt-BR', { ignore: 'áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ ' });
    }
}

module.exports = new Validator();
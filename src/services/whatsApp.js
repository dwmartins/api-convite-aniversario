require('dotenv').config();
var axios = require('axios');
var qs = require('qs');

class SendMSgWhatsApp {

    constructor(to, msg) {
        this.data = qs.stringify({
            'apikey': process.env.API_KEY,
            'phone_number': process.env.NUMBER,
            'contact_phone_number': to,
            'message_custom_id': 'mysoftwareid',
            'message_type': 'text',
            'message_body': msg,
            'check_status': '1',
            'message_to_group': '0',
            'w_instancia_id': '888'
        });

        this.config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://app.whatsgw.com.br/api/WhatsGw/Send',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: this.data
        };
    }
   
    sendMsg = async () => {
        axios(this.config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

module.exports = new SendMSgWhatsApp();


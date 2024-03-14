const express = require("express");
const route = express.Router();
const guestsCtrl = require("../controllers/guestsCtrl");

route.post('/', guestsCtrl.new);
route.get('/', guestsCtrl.list);

module.exports = route;
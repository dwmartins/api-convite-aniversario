const express = require("express");
const route = express.Router();
const guestsCtrl = require("../controllers/guestsCtrl");

route.post('/', guestsCtrl.new);

module.exports = route;
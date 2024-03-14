const express = require("express");
const route = express.Router();
const guestsCtrl = require("../controllers/guestsCtrl");

route.post('/', guestsCtrl.new);
route.get('/', guestsCtrl.list);
route.put('/', guestsCtrl.update);
route.delete('/:id', guestsCtrl.delete);

module.exports = route;
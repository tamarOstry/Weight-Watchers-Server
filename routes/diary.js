const express = require('express');
const route = express.Router();
const controller = require('../controller/diary');
route.get('/:id', controller.getDiary);
route.post('/:id', controller.addDaySummary);
route.post('/:idU/:idD', controller.updateDaySummary);
route.delete('/:idU/:idD', controller.deleteDaySummary);

module.exports = route;
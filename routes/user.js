const express=require('express');
const route=express.Router();
const controller=require('../controller/user');

route.get('/',controller.getAll);
route.get('/:id',controller.getById);
route.put('/:id',controller.update);
route.post('/',controller.add);
route.delete('/:id',controller.delete);

module.exports=route;


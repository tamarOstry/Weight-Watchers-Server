const express=require('express');
const route=express.Router();
const controller=require('../controller/account');

route.post('/',controller.getByEmailPassword);

module.exports=route;
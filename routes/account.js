const express = require('express');
const route = express.Router();
const controller = require('../controller/account');
// const swaggerUi = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerOptions = {
//     swaggerDefinition:{
//       info:{
//         title:'Weight API',
//         version:'1.0.0'
//       }
//     },
//     apis:['app.js']
//   };
// const swaggerDoc = swaggerJsDoc(swaggerOptions);
// console.log(swaggerDoc);
// 
// /**
// * @swagger
// * /api/post:
// *   get:
// *     tags:
// *       - doctor
// *     description: Returns all doctor
// *     produces:
// *       - application/json
// *     responses:
// *       200:
// *         description: An array of doctor
// *         schema:
// *           $ref: '#/definitions/account'
// */
 route.post('/', controller.getByEmailPassword);



 
//route.get('/:email/:password', controller.getByEmailPassword);

module.exports = route;
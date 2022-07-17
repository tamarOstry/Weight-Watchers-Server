const express = require('express');
const app = express();
const account = require('./routes/account');
const user = require('./routes/user');
const meeting = require('./routes/meeting');
const diary = require('./routes/diary');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const db = require("./db/db");
const logger = require('./log/logger');
// const swaggerJsDoc = require("swagger-jsdoc");
swaggerDocument = require("./swagger.json");

require('dotenv').config();
const port = process.env.PORT;
// const swaggerOptions = {
//     swaggerDefinition:{
//       info:{
//         title:'Weight API',
//         version:'1.0.0'
//       }
//     },
//     apis:['/router/*.js']
//   };
//   const swaggerDoc = swaggerJsDoc(swaggerOptions);
//   console.log(swaggerDoc);
//   /**
//    * @swagger 
//    * /user
//    * get:
//    * description: getData
//    */

// // app.get('/user',(req, res) => {
// //     res.send([{
// //         id:1,
// //         title: 'Welcome'
// //     }])
// // })
db.connect();
app.use(cors());
app.use(express.json());

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use('/account', account);
app.use('/user', user);
app.use('/meeting', meeting);
app.use('/diary', diary);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, './static/HTML/404.html'));
})

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('something failed');
})

app.listen(port , () => {
    logger.info(`the server go on ${port}`)
})
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
swaggerDocument = require("./swagger.json");
const { auth } = require('express-openid-connect');
const path=require('path')
require('dotenv').config();

const port = process.env.PORT||8000;
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'eZR6s1nu5ioNVU1sToe7HBVOV0A5Gbr5Yag-oaHm7PxUb7m-OFhd99kGeIXmuAlQ',
    baseURL: 'http://localhost:3000',
    clientID: '3VL512NdKNnH2t7rPSBfMRagCeJ5Kbd2',
    issuerBaseURL: 'https://dev-rsbbasni.us.auth0.com'
  };
const {requiresAuth} = require('express-openid-connect');

db.connect();
app.use(cors());
app.use(express.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile',requiresAuth(),(req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use('/account', account);
app.use('/user', user);
app.use('/meeting', meeting);
app.use('/diary', diary);

// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, './static/HTML/404.html'));
// })

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('something failed');
})

app.listen(port , () => {
    logger.info(`the server go on ${port}`)
})
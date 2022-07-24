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
const {requiresAuth} = require('express-openid-connect');
const path=require('path');
// const expressSession = require("express-session");
// const passport = require("passport");
// const Auth0Strategy = require("passport-auth0");
require('dotenv').config();

// const port = process.env.PORT||8000;
const {PORT,ISSUER_BASE_URL,CLIENT_ID,BASE_URL,SECRET} = process.env;

db.connect();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET,
  baseURL: BASE_URL,
  clientID: CLIENT_ID,
  issuerBaseURL: ISSUER_BASE_URL
};

app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.use(cors());
app.use(express.json());

app.use('/*',requiresAuth())
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

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(PORT , () => {
    logger.info(`the server go on ${PORT}`)
})
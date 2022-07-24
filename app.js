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
const { auth } = require('express-openid-connect');
swaggerDocument = require("./swagger.json");
const { requiresAuth } = require('express-openid-connect');
const clientUrl = 'http://127.0.0.1:5500/src/html/homeUser.html'
require('dotenv').config();

const port = process.env.PORT;
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'WERt8QG4W2AUSnG3KGo3YhD3qwqGoOcH',
    issuerBaseURL: 'https://dev-d1mqdua2.us.auth0.com'
};
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
db.connect();
app.use(cors());
app.use(express.json());
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    console.log(req.cookies)
    if(req.oidc.isAuthenticated()){
        console.log(req.cookies)
        res.cookie(req.cookie)
        console.log(res.cookies)
        res.send( res.redirect(clientUrl));
    }else{
        res.send('loggedOut')
    }
    
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
app.use('/*',requiresAuth());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/account', account);
app.use('/user', user);
app.use('/meeting', meeting);
app.use('/diary', diary);



app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('something failed');
})

app.listen(port, () => {
    logger.info(`the server go on ${port}`)
})


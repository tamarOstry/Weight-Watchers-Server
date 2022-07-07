const express = require('express');
const app = express();
const account = require('./routes/account');
const user = require('./routes/user');
const meeting = require('./routes/meeting');
const diary = require('./routes/diary');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;
app.use(cors());


app.use(cors());
app.use(express.json());
app.use('/account', account);
app.use('/user', user);
app.use('/meeting ', meeting);
app.use('/diary', diary);


app.use((err, req, res, next) => {
    debugger
    console.log(err);
    res.status(500).send('something failed');

})

app.listen(port || 3000, () => {
    console.log(`the server go on ${port}`)
})
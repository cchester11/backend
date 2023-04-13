const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const database = require('./config/dbhelper.js');
const authRoute = require('./routes/auth.js');

const PORT = 5001 || process.env.PORT;

const app = express();

database.connection();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
      extended: true
}));

app.use('/api/auth', authRoute)

app.use(cookieParser());

app.listen(PORT, () => {
      console.log('app listening on ' + PORT)
})
var express = require('express');
var app = express();
var path = require('path');
require('dotenv').config();
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:3000',
    clientID: 'O8pjm6YAxcFfeTj8aBMpnLGi3QysMz0w',
    issuerBaseURL: 'https://dev-qt6kr6ycqpgdvgrv.eu.auth0.com'
};

// define routes
const homeRouter = require('./routes/index.routes');
const databaseRouter = require('./routes/database.routes');
const userRouter = require('./routes/user.routes');

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// views folder
app.set('views', path.join(__dirname, 'views'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// home page
app.use('/', homeRouter);

// database page
app.use('/search', databaseRouter);

// user page
app.use('/user', userRouter);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
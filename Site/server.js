var express = require('express');
var app = express();
var path = require('path');

// define routes
const homeRouter = require('./routes/index.routes');
const databaseRouter = require('./routes/database.routes');

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

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
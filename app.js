var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var session = require('express-session');
var cookieParser = require('cookie-parser');

var SQLiteStore = require('connect-sqlite3')(session);
var routes = require('./routes/index');
var app = express()

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    store: new SQLiteStore,
    secret: 'your secret',
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
    resave: true,
    saveUninitialized: true
  }));
  
app.use('/', routes);

if (app.get('env') == 'development') {
  app.use(morgan('dev'));
}


var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode.');

});

module.exports = app;




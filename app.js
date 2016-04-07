
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , map = require('./routes/map')
    , three = require('./routes/three')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use("/papers", express.static(path.join(__dirname, 'public/javascripts/entities')));
app.use(express.static(path.join(__dirname, 'components')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/map', map.get);
app.get('/three', three.test);
app.get('/users', user.list);

module.exports = app;

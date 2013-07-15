
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , map = require('./routes/map')
  , three = require('./routes/three')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Mincer = require('mincer');

var app = express();

// all environments
app.set('port', process.env.PORT || 3050);
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
app.use(express.static(path.join(__dirname, 'components')));

var minceEnv = new Mincer.Environment();
minceEnv.appendPath('public/javascripts/entities');

app.use('/papers', Mincer.createServer(minceEnv));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/login', routes.login);
// create login view
app.get('/map', map.get);
app.get('/three', three.test);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

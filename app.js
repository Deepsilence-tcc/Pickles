var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ResultModel = require('./utils/resultmodel');
var CodeMessage = require('./utils/codemessage');

//数据库配置
var mongoose = require('./config/mongoose.js');
var db = mongoose();


var app = express();


var UserRouter = require('./routes/user.route.js');
var MovieRouter = require('./routes/movie.route.js');
var MovieTypeRouter = require('./routes/movie.type.route.js');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',UserRouter);
app.use('/movie',MovieRouter);
app.use('/type',MovieTypeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler,发生错误不会终止进程，只会打印错误
app.use(function(err, req, res, next) {
    var resultMode = new ResultModel();
    resultMode.msg = CodeMessage.MSG_0;
    resultMode.code = 0
    return res.json(resultMode);
});

module.exports = app;

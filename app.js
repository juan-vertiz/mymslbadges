var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');
var ogGenerator = require('./services/og-generator');

var transcriptRouter = require('./routes/transcript');
var healthRouter = require('./routes/health');

var app = express();

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true,
});
app.set('view engine', 'njk');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/transcript', transcriptRouter);
app.use('/health', healthRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(async function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const svg = await ogGenerator(res, 'error');
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

module.exports = app;

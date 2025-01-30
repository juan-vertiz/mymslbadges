require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var nunjucks = require('nunjucks');
var ogGenerator = require('./services/OgGeneratorUtility');
var winston = require('./services/LoggerService');
var morgan = require('morgan');

const httpLogger = winston.loggers.get('http-service');
const appLogger = winston.loggers.get('app-service');

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Middleware for HTTP logging
 */
// requests
app.use(morgan(
  'REQ :remote-addr :method :url HTTP/:http-version :user-agent',
  {
    immediate: true,
    stream: {
      write: (message) => httpLogger.http(message.trim()),
    },
  }
));
// responses
app.use(morgan(
  'RES :remote-addr :method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => httpLogger.http(message.trim()),
    },
  }
));

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
  appLogger.error(err);

  // render the error page
  const svg = await ogGenerator(res, 'error');
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

module.exports = app;

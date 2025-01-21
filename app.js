var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');
const satori = require('satori').default;
const fs = require('fs');
const html = (...args) => import('satori-html').then(({ html }) => html(...args));

const fontData = fs.readFileSync(
  path.join(__dirname, 'assets', 'fonts', 'OpenSans-Regular.ttf')
);

var transcriptRouter = require('./routes/transcript');
var healthcheckRouter = require('./routes/healthcheck');

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
app.use('/healthcheck', healthcheckRouter);

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
  const rendered = nunjucks.render('error.njk');
  const reactObject = await html(rendered.replace(/(\r?\n|\r)\s*/g, ''));
  const svg = await satori(reactObject, {
    width: 400,
    height: 200,
    fonts: [
      {
        name: 'Open Sans',
        data: fontData,
        style: 'normal'
      }
    ]
  });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

module.exports = app;

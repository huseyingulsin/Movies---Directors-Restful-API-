const express = require('express');
const app = express();


const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const movie = require('./routes/movie');
const director = require('./routes/director');

//middleware
const verifytoken = require('./middleware/verifytoken.js')



//db connection 
const db = require('./helper/db.js')();

// config info
const config = require('./config.js');


app.set('api_secret_key',config.api_secret_key)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/', verifytoken)
app.use('/api/movies', movie);
app.use('/api/director',director)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: {message:err.message,code:err.code}});
});

module.exports = app;

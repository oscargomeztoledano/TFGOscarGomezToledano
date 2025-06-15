var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var playersRouter = require('./routes/players.js');
// var teamsRouter = require('./routes/teams.js');
// var matchesRouter = require('./routes/matches.js');
// var groupsRouter = require('./routes/groups.js');
var alumnosRouter = require('./routes/alumnos.js');
var aulasRouter = require('./routes/aulas.js');
var profesoresRouter = require('./routes/profesores.js');
var mundosRouter = require('./routes/mundos.js');

var app = express();
var debug = require('debug')('backend:server');

var bodyParser  = require("body-parser");   
var mongoose = require('mongoose');
var cors = require('cors');   
app.use(cors({origin: 'http://localhost:8080', credentials: true}));  
app.use(bodyParser.json({limit: '50mb'}));  
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));   
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexión a la base de datos
require('dotenv').config();
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to the database');
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // Dependiendo de lo que llegue se manda a una ruta u a otra
// app.use('/players', playersRouter);
// app.use('/teams', teamsRouter);
// app.use('/matches', matchesRouter);
// app.use('/groups', groupsRouter);
app.use('/alumnos', alumnosRouter);
app.use('/aulas', aulasRouter);
app.use('/profesores', profesoresRouter);
app.use('/mundos', mundosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Passing title explicitly
  const errorDetails = {
    title: 'Error',
    message: err.message,
    error: res.locals.error
  };

  // render the error page
  res.status(err.status || 500);
  res.render('error', errorDetails);
});

module.exports = app;

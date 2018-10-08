var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var booksRouter = require('./routes/books');
var loginRouter = require('./routes/login');
var registrationRouter = require('./routes/registration');
var notesRouter = require('./routes/notes');
var emailRouter = require('./routes/sendEmail');
var fileUpload = require('express-fileupload');

var app = express();

var db = mongoose.connection;
var db_url = "mongodb://localhost:27017/notes";
mongoose.connect('mongodb://localhost:27017/notes');

// When successfully connected
db.on('connected', function () {
    console.log('Mongoose connection open to '+ db_url);
});

// If the connection throws an error
db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true); 
    res.setHeader('content-type','application/json; charset=utf-8')      
    next();  
});
app.use(fileUpload()); 
app.use(bodyParser.json({limit: '50mb'})); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use("/uploads", express.static('uploads'));

app.use(function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();    
  });

app.disable('etag');


//form-urlencoded

// for parsing multipart/form-data
//app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/profile', profileRouter);
app.use('/books', booksRouter);
app.use('/notes', notesRouter);
app.use('/sendEmail', emailRouter);
// app.use('/login', loginRouter);

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
  res.render('error');
});

module.exports = app;

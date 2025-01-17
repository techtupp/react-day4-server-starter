require('dotenv').config();
require('./configs/passport');

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const index = require('./routes/index');
const authRoutes = require('./routes/auth-routes');

// WHEN INTRODUCING USERS DO THIS:
// INSTALL THESE DEPENDENCIES: passport-local, passport, bcryptjs, express-session
// AND UN-COMMENT OUT FOLLOWING LINES:

const session       = require('express-session');
const passport      = require('passport');

const app = express();
// ADD SESSION SETTINGS HERE:



const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: "doesn't matter in our case", // but it's required
  resave: false,
  saveUninitialized: false, // don't create cookie for non-logged-in user
  // MongoStore makes sure the user stays logged in also when the server restarts
  store: new MongoStore({ mongooseConnection: mongoose.connection }) 
}));

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// IF YOU STILL DIDN'T, GO TO 'configs/passport.js' AND UN-COMMENT OUT THE WHOLE FILE

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', authRoutes);
// Express View setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:



// ROUTES MIDDLEWARE STARTS HERE:


app.use('/', index);

app.use('/api', require('./routes/project-routes'));
app.use('/api', require('./routes/task-routes'));
app.use('/api', require('./routes/auth-routes'));

//for deployment on heroku
app.use((req, res, next) => {
  res.sendFile(__dirname + "/client/build/index.html")
});



module.exports = app;

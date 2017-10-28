const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const morganToolkit = require('morgan-toolkit')(logger);
const expressHandlebars = require('express-handlebars');

const hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'application',
  extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('short'));
app.use(morganToolkit());

// handle delete and put requests
app.use((req, res, next) => {
  if (req.query._method || req.body._method) {
    let method = req.query._method || req.body._method;
    req.method = method.toUpperCase();
    req.url = req.path;
  }
  next();
});

const usersRoutes = require('./routers/users');
app.use('/', usersRoutes);

// Get the port from the ENV
// command-line arg
// or set it to 3000
var port = process.env.PORT ||
  process.argv[2] ||
  3000;
var host = 'localhost';

// If we're in production we only need
// the port in our args to the listen
// function
// else we can specify both in development
var args;
process.env.NODE_ENV === 'production' ?
  args = [port] :
  args = [port, host];

// Add a helpful console.log
// message when the server starts
args.push(() => {
  console.log(`Listening: http://${ host }:${ port }`);
});

// Use apply to pass the args
// to listen
app.listen.apply(app, args);

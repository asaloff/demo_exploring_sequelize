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

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

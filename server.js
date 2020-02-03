const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const session = require('express-session');

const app = express();

dotenv.config({ path: './config.env' });

// Routers
const smsRouter = require('./routes/sms');

app.use(express.json());

app.use(morgan('dev'));

app.use(session({ secret: process.env.SESSION_SECRET }));

app.use('/api/v1/sms', smsRouter);

// error handler
app.use(require(`./utils/errorHandler`));

const PORT = process.env.PORT || 300;
app.listen(PORT, function(err, data) {
  if (err) {
    console.log(`${err}`.red);
  }
  console.log(`Listening on port ${PORT}`.green.underline);
});

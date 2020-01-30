const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

dotenv.config({ path: './config.env' });

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(err, data) {
  if (err) {
    console.log(`${err}`.red);
  }
  console.log(`Listening on port ${5000}`.green.underline);
});

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

dotenv.config({ path: './config.env' });

// Routers
const smsRouter = require('./routes/sms')

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/sms', smsRouter);

// client.messages
//   .create({
//     body: 'Victory take am easy Jeje',
//     to: '+234 816 533 9431', // Text this number
//     from: '+1 253 655 0491' // From a valid Twilio number
//   })
//   .then(message => console.log(message.sid));

// client.calls
//   .create({
//     url: 'http://demo.twilio.com/docs/voice.xml',
//     to: '+234 816 533 9431',
//     from: '+1 253 655 0491'
//   })
//   .then(call => process.stdout.write(call.sid));
// client.calls.each(call => console.log(call.direction));

// error handler
app.use(require(`./utils/errorHandler`));

const PORT = process.env.PORT || 300;
app.listen(PORT, function(err, data) {
  if (err) {
    console.log(`${err}`.red);
  }
  console.log(`Listening on port ${PORT}`.green.underline);
});

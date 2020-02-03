const twilio = require('twilio');

const MessagingResponse = twilio.twiml.MessagingResponse;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const from = `+${process.env.FROM}`;
const client = twilio(accountSid, authToken);

exports.sms = async (req, res, next) => {
  const { to, text } = req.body;

  try {
    const message = await client.messages.create({
      body: text,
      to,
      from
    });

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

// sends sms with multimedia link
exports.multimedia = async (req, res, next) => {
  try {
    const message = await client.messages.create({
      body: 'Hello there!',
      from,
      mediaUrl: ['https://demo.twilio.com/owl.png'],
      to: req.body.to
    });

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

exports.reply = async (req, res, next) => {
  const twiml = new MessagingResponse();
  let message;

  if (req.body.Body === 'hello') {
    message = 'Hi!';
  } else if (req.body.Body === 'bye') {
    message = 'Goodbye';
  } else {
    message = 'Hello, thanks for the new message.';
  }

  twiml.message(message);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
};

exports.whatsapp = async (req, res, next) => {
  const { to, text } = req.body;
  try {
    const message = await client.messages.create({
      from: 'whatsapp:+14155238886',
      body: text,
      to: `whatsapp:${to}`
    });

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
};

// exports.whatsappReply = async (req, res, next) => {
//   const twiml = new MessagingResponse();
//   let message;
//   if (req.body.Body.toLowerCase().includes('hello')) {
//     message = 'Hi!';
//   } else if (req.body.Body.toLowerCase().includes('bye')) {
//     message = 'Goodbye';
//   } else {
//     message = 'default response.';
//   }
//   console.log(req.body);

//   twiml.message(message);

//   res.writeHead(200, { 'Content-Type': 'text/xml' });
//   res.end(twiml.toString());
// };

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
    const message = client.messages.create({
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

exports.defaultReply = async (req, res, next) => {
  const smsCount = req.session.counter || 0;

  let message = 'Hello, thanks for the new message.';

  if (smsCount > 0) {
    message = `Hello, thanks for message number ${smsCount + 1}`;
  }

  req.session.counter = smsCount + 1;

  const twiml = new MessagingResponse();
  twiml.message(message);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
};

exports.conversation = async (req, res, next) => {};

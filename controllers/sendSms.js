const twilio = require('twilio');

const sendSms = async (req, res, next) => {
  const { to, from, text } = req.body;
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: text,
      to,
      from
    });

    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = sendSms;

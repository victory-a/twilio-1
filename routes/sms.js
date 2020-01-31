const router = require('express').Router();
const sendSms = require('../controllers/sendSms');

router.post('/send', sendSms);

module.exports = router;

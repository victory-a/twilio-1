const router = require('express').Router();
const { sms, multimedia, defaultReply } = require('../controllers/sms');

router.post('/sms', sms);

module.exports = router;

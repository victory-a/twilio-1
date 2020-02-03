const router = require('express').Router();
const { sms, whatsapp, whatsappReply } = require('../controllers/messages');

router.post('/sms', sms);
router.post('/whatsapp', whatsapp);
router.post('/whatsapp/reply', whatsappReply);

module.exports = router;

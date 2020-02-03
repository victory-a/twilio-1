const router = require('express').Router();
const { sms, whatsapp } = require('../controllers/messages');

router.post('/sms', sms);
router.post('/whatsapp', whatsapp);

module.exports = router;

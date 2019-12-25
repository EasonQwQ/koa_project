const router = require('koa-router')();
const eCommereCenterController = require('../controller/eCommereCenterController');

router.get('/getAllFeedback', eCommereCenterController.getAllFeedback);
router.post('/sendReward', eCommereCenterController.sendReward);
router.get('/sendMassText', eCommereCenterController.massText);
router.get('/tenPercentMessage', eCommereCenterController.tenPercentMessage);
router.get('/sendProcuct', eCommereCenterController.sendProcuct);
router.get('/sendMessageByMessageId', eCommereCenterController.sendMessageByMessageId);
module.exports = router.routes();

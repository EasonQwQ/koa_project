const router = require('koa-router')();
const remoteUserController = require('../controller/remoteUser');

router.post('/getAll', remoteUserController.getAll);
router.get('/getUserByWorkUnit', remoteUserController.getUserByWorkUnit);
router.get('/getOrderByWorkUnit', remoteUserController.getOrderByWorkUnit);
router.post('/getOrderByDate', remoteUserController.getOrderByDate);
module.exports = router.routes();

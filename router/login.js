const router = require('koa-router')();
const user = require('./admin/user');

const userController = require('../controller/userController');

router.post('/add', (ctx) => {
  ctx.body = ctx.request.body;
});
router.get('/login', userController.login);
router.get('/judgeidentity', userController.judgeidentity);
router.get('/loginByCode', userController.loginByCode);
router.post('/loginByUserNameAndPassword', userController.loginByUserNameAndPassword);
module.exports = router.routes();

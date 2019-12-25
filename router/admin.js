// eslint-disable-next-line import/no-unresolved
const router = require('koa-router')();
const user = require('./admin/user');

router.get('/', (ctx) => {
  ctx.body = '管理页面';
});
router.use('/user', user);
module.exports = router.routes();

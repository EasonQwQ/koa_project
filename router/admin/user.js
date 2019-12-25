const Koa = require('koa');
const body = require('koa-bodyparser');
const router = require('koa-router')();

const app = new Koa();
app.use(body);
const userController = require('../../controller/userController');

router.get('/users', (ctx) => {
  ctx.body = '1111';
});

router.post('/addUser', userController.creater);

module.exports = router.routes();

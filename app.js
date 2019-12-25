const Koa = require('koa');
// eslint-disable-next-line import/no-unresolved
const router = require('koa-router')();
// eslint-disable-next-line import/no-unresolved
const body = require('koa-bodyparser');

const app = new Koa();
const fs = require('fs');
const https = require('https');
// eslint-disable-next-line import/no-unresolved
const enforceHttps = require('koa-sslify');
const login = require('./router/login');
const admin = require('./router/admin');
const operation = require('./router/operation');
const enterprise = require('./router/enterprise');
const eCommereCenter = require('./router/eCommereCenter');
const remoteUser = require('./router/remoteUser');

const options = {
  key: fs.readFileSync('./ssl/xxxx.key'),
  cert: fs.readFileSync('./ssl/xxx.crt'),
};
app.use(body());

router.get('/', (ctx) => {
  ctx.body = '1111';
});
router.post('/add', (ctx, netx) => {
  console.log(ctx.request.body);
  netx();
});
router.use('/admin', admin);
router.use('/login', login);
router.use('/operation', operation);
router.use('/enterprise', enterprise);
router.use('/eCommereCenter', eCommereCenter);
router.use('/remoteUser', remoteUser);
app.use(router.routes()).use(router.allowedMethods());
https.createServer(options, app.callback()).listen(3000);// 正式版
// https.createServer(options, app.callback()).listen(8999); // 测试版

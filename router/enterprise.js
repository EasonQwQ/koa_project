const router = require('koa-router')();

const targetEnterpriseController = require('../controller/targetEnterpriseController');


router.post('/add', targetEnterpriseController.creater);
router.get('/getalllist', targetEnterpriseController.getAll);
router.get('/getpicbyid', targetEnterpriseController.getPicById);
router.post('/addpic', targetEnterpriseController.addPic);
router.get('/viewpicsbyid', targetEnterpriseController.viewPicsById);
router.get('/getinfobyid', targetEnterpriseController.getInfoById);
router.get('/search', targetEnterpriseController.search);
module.exports = router.routes();

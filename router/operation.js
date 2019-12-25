const router = require('koa-router')();
const operationController = require('../controller/operationController');


// router.post('/upload', upload.single('file'), operationController.uploadPic);
router.post('/uploadPic', operationController.uploadPic);
router.post('/viewpics', operationController.viewPics);
router.post('/clockin', operationController.clockIn);
router.get('/getlist', operationController.getList);
router.post('/viewpicsbyname', operationController.viewPicsByName);
router.get('/getstorelist', operationController.getStoreList);
router.get('/getstoredetailbyid', operationController.getStoreDetailById);
router.post('/receiveMaterual', operationController.receiveMaterual);
module.exports = router.routes();

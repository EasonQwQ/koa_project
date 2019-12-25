const QcloudSms = require('qcloudsms_js');
const xlsx = require('node-xlsx');
const fs = require('fs');
const feedback = require('../models/feedback');
const messageConfig = require('../config/message');

const remoteUserModel = require('../models/remoteUser');

class eCommereCenterController {
  /**
   * 获取所有反馈人数
   */
  static async getAllFeedback(ctx) {
    const list = await feedback.getAll();
    ctx.body = list;
  }

  /**
   * 发送积分
   */
  static async sendReward(ctx) {
    const callback = (err, res, resData) => {
      if (err) {
        console.log('err: ', err);
      } else {
        console.log('request data: ', res.req);
        console.log('response data: ', resData);
      }
    };
    const { id, reward, mobile } = ctx.request.body;
    const num = reward.replace(/[^0-9]/ig, '');
    const phoneNumbers = [mobile];
    const templateId = 410157;
    const smsSign = 'xxx';
    ctx.body = id;
    const data = await feedback.updateRewardById(id, reward);
    const qcloudsms = QcloudSms(messageConfig.appid, messageConfig.appkey);
    const ssender = qcloudsms.SmsSingleSender();
    const params = [num];
    ssender.sendWithParam(86, phoneNumbers[0], templateId,
      params, smsSign, '', '', callback);
    ctx.body = data;
  }

  /**
   * 群发短信
   */
  /**
   * bug点：xlxs解析xls文件的时候，
   * 自动将电话号码转换成了number类型
   * 要将number转换成string类型
   */
  static async massText(ctx) {
    const obj = xlsx.parse('./xlsx/test.xls');
    const excelObj = obj[0].data;
    excelObj.splice(0, 1);
    const temp = [];
    excelObj.map((v) => {
      v[0] += '';
      if (v[0].length === 11) {
        temp.push(v[0]);
      }
    });
    let count = temp.length;

    const phoneNumbersList = [];
    while (count > 200) {
      phoneNumbersList.push(temp.splice(0, 200));
      count -= 200;
    }
    if (temp.length > 0) {
      phoneNumbersList.push(temp);
    }
    /* ----------- 发送短信的各个参数 -----------------*/
    const callback = (err, res, resData) => {
      if (err) {
        console.log('err: ', err);
      } else {
        console.log('request data: ', res.req);
        console.log('response data: ', resData);
      }
    };

    const qcloudsms = QcloudSms(messageConfig.appid, messageConfig.appkey);
    const msender = qcloudsms.SmsMultiSender();
    const templateId = 438161;
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    if (month === 0) {
      month = 12;
      year -= 1;
    }
    const params = [year, month];// 第一个为年份,第二个为月份。
    const smsSign = 'xxx';
    phoneNumbersList.map((v) => {
      msender.sendWithParam(86, v, templateId,
        params, smsSign, '', '', callback);
    });
    ctx.body = 'ok';
  }
  // sql 语句

  static async tenPercentMessage(ctx) {
    const {
      workUnit = '', chooseWorkUnit, discount, discountPercent,
    } = ctx.request.query;
    if (workUnit.length === 0 || !workUnit || discount.length === 0 || chooseWorkUnit.length === 0 || discountPercent.length === 0) {
      ctx.code = 400;
      return;
    }
    const allList = await remoteUserModel.getMobileByWorkUnit(chooseWorkUnit);
    const temp = [];
    allList.map((v) => {
      v.dataValues.mobile += '';
      // console.log('222', v.dataValues.mobile += '');
      if (v.dataValues.mobile.length === 11) {
        temp.push(v.dataValues.mobile);
      }
    });
    let count = temp.length;

    const phoneNumbersList = [];
    while (count > 200) {
      phoneNumbersList.push(temp.splice(0, 200));
      count -= 200;
    }
    if (temp.length > 0) {
      phoneNumbersList.push(temp);
    }
    console.log(phoneNumbersList[0]);
    /* ----------- 发送短信的各个参数 -----------------*/
    const callback = (err, res, resData) => {
      if (err) {
        console.log('err: ', err);
      } else {
        console.log('request data: ', res.req);
        console.log('response data: ', resData);
      }
    };
    // console.log('workunit', workUnit);
    const qcloudsms = QcloudSms(messageConfig.appid, messageConfig.appkey);
    const msender = qcloudsms.SmsMultiSender();
    const templateId = 493805;
    const params = [workUnit, discount, discountPercent];// 第2个抵扣,第3 个抵扣的折扣
    const smsSign = 'xxx';
    phoneNumbersList.map((v) => {
      msender.sendWithParam(86, v, templateId,
        params, smsSign, '', '', callback);
    });
    ctx.body = 'ok';
  }


  static async sendProcuct(ctx) {
    const obj = xlsx.parse('./xlsx/allUser.xls');
    const excelObj = obj[0].data;
    excelObj.splice(0, 1);
    const temp = [];
    excelObj.map((v) => {
      v[0] += '';
      if (v[0].length === 11) {
        temp.push(v[0]);
      }
    });
    let count = temp.length;

    const phoneNumbersList = [];
    while (count > 200) {
      phoneNumbersList.push(temp.splice(0, 200));
      count -= 200;
    }
    if (temp.length > 0) {
      phoneNumbersList.push(temp);
    }
    /* ----------- 发送短信的各个参数 -----------------*/
    const callback = (err, res, resData) => {
      if (err) {
        console.log('err: ', err);
      } else {
        console.log('request data: ', res.req);
        console.log('response data: ', resData);
      }
    };
    // console.log('workunit', workUnit);
    const qcloudsms = QcloudSms(messageConfig.appid, messageConfig.appkey);
    const msender = qcloudsms.SmsMultiSender();
    const templateId = 477080;
    const params = [];// 第一个为年份,第二个为月份。
    const smsSign = 'xxx';
    phoneNumbersList.map((v) => {
      msender.sendWithParam(86, v, templateId,
        params, smsSign, '', '', callback);
    });
    ctx.body = 'ok';
  }

  static async sendMessageByMessageId(ctx) {
    const { messageId } = ctx.request.query;
    const allUserLevelGt2 = await remoteUserModel.getUserLevelGt2();
    const temp = allUserLevelGt2.map(v => v.mobile);
    let count = temp.length;
    const phoneNumbersList = [];
    while (count > 200) {
      phoneNumbersList.push(temp.splice(0, 200));
      count -= 200;
    }
    if (temp.length > 0) {
      phoneNumbersList.push(temp);
    }
    const callback = (err, res, resData) => {
      if (err) {
        console.log('err: ', err);
      } else {
        console.log('request data: ', res.req);
        console.log('response data: ', resData);
      }
    };
    /* ----------- 发送短信的各个参数 -----------------*/
    const qcloudsms = QcloudSms(messageConfig.appid, messageConfig.appkey);
    const msender = qcloudsms.SmsMultiSender();
    const templateId = messageId;
    const params = [];// 第一个为年份,第二个为月份。
    const smsSign = 'xxx';
    phoneNumbersList.map((v) => {
      msender.sendWithParam(86, v, templateId,
        params, smsSign, '', '', callback);
    });
    ctx.code = 400;
  }
}


module.exports = eCommereCenterController;

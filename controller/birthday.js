/* eslint-disable import/no-unresolved */
const QcloudSms = require('qcloudsms_js');
const xlsx = require('node-xlsx');
const messageConfig = require('../config/message');

const birthdayMessage = () => {
  const callback = (err, res, resData) => {
    if (err) {
      console.log('err: ', err);
    } else {
      console.log('request data: ', res.req);
      console.log('response data: ', resData);
    }
  };
  const obj = xlsx.parse('/home/koa/xlsx/birthday.xls');
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
  let num = 0;

  const phoneNumbersList = [];
  while (count > 200) {
    phoneNumbersList.push(temp.splice(0, 200));
    num += 200;
    count -= 200;
  }
  if (temp.length > 0) {
    phoneNumbersList.push(temp);
  }
  // console.log('111', phoneNumbersList);
  const qcloudsms = QcloudSms(messageConfig.appid, messageConfig.appkey);
  const msender = qcloudsms.SmsMultiSender();
  const templateId = 456548;

  const params = [];// 第一个为年份,第二个为月份。
  const smsSign = 'xxx';
  phoneNumbersList.map((v) => {
    msender.sendWithParam(86, v, templateId,
      params, smsSign, '', '', callback);
  });
};
birthdayMessage();

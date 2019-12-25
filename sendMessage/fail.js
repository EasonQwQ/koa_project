// /* eslint-disable import/no-unresolved */
// const QcloudSms = require('qcloudsms_js');
// const xlsx = require('node-xlsx');
// const messageConfig = require('../config/message');

// const lv2Message = () => {
//   const obj = xlsx.parse('/home/koa/xlsx/fail.xls');
//   const excelObj = obj[0].data;
//   excelObj.splice(0, 1);
//   const temp = [];
//   excelObj.map((v) => {
//     v[0] += '';
//     if (v[0].length === 11 && v[6] === 1046) {
//       temp.push(v[0]);
//     }
//   });
//   let count = temp.length;

//   let num = 0;

//   const phoneNumbersList = [];
//   while (count > 200) {
//     phoneNumbersList.push(temp.splice(num, 200));
//     num += 200;
//     count -= 200;
//   }
//   if (temp.length > 0) {
//     phoneNumbersList.push(temp);
//   }
//   /* ----------- 发送短信的各个参数 -----------------*/
//   const callback = (err, res, resData) => {
//     if (err) {
//       console.log('err: ', err);
//     } else {
//       console.log('request data: ', res.req);
//       console.log('response data: ', resData);
//     }
//   };

//   const qcloudsms = QcloudSms(messageConfig.appid, messageConfig.appkey);
//   const msender = qcloudsms.SmsMultiSender();
//   const templateId = 438161;
//   let year = new Date().getFullYear();
//   let month = new Date().getMonth();
//   if (month === 0) {
//     month = 12;
//     year -= 1;
//   }
//   const params = [year, month];// 第一个为年份,第二个为月份。
//   const smsSign = 'xxx';
//   phoneNumbersList.map((v) => {
//     msender.sendWithParam(86, v, templateId,
//       params, smsSign, '', '', callback);
//     // console.log(v.length);
//   });
// };
// lv2Message();

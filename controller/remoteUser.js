
const remoteUserModel = require('../models/remoteUser');

class UserController {
  static async getAll(ctx) {
    const temp = JSON.parse(JSON.stringify(ctx.request.body));
    console.log('temp', temp);
    let res;
    if (temp.checkSignIn) {
      res = await remoteUserModel.getAllUserByWorkUnitAndSignDate(temp);
    } else {
      res = await remoteUserModel.getAllUserByWorkUnit(temp);
    }

    ctx.body = res;
  }

  static async getOrderByWorkUnit(ctx) {
    const temp = JSON.parse(JSON.stringify(ctx.request.query));
    console.log('111', temp);
    const res = await remoteUserModel.getUserOrder(temp);
    ctx.body = res;
  }

  static async getUserByWorkUnit(ctx) {
    const temp = JSON.parse(JSON.stringify(ctx.request.query));
    const res = await remoteUserModel.getUserByWorkUnit(temp);
    ctx.body = res;
  }

  static async getOrderByDate(ctx) {
    const temp = JSON.parse(JSON.stringify(ctx.request.body));
    const res = await remoteUserModel.getOrderByDate(temp);
    ctx.body = res;
  }
}
module.exports = UserController;

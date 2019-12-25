/* eslint-disable max-len */
const UserModel = require('../models/user');
const verifyJwt = require('../utils/util');
const OperationPicModel = require('../models/operation_pic');
const ClockInListModel = require('../models/clock_in_lists');
const StoreModel = require('../models/store');
const StoreDetailModel = require('../models/store_detail');
const ReceiveMaterualModel = require('../models/receive_materual');

class operationController {
  /**
   * 上传
   */
  static async uploadPic(ctx) {
    const {
      name, location, picAddress, disance,
    } = ctx.request.body;
    const { date } = ctx.request.body;
    const time = new Date(date);
    const caclDate = date.split('T')[0];
    const caclTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    const list = await OperationPicModel.createrRecord(name, caclDate, location, picAddress, disance, caclTime);
    ctx.body = list.dataValues;
  }

  static async viewPics(ctx) {
    const { date } = ctx.request.body;
    const list = await OperationPicModel.findByDate(date);
    ctx.body = list;
  }

  static async clockIn(ctx) {
    const {
      location, disance, date, name, machineCode,
    } = ctx.request.body;
    const tempDate = new Date(date).toLocaleString();
    const list = await ClockInListModel.createrRecord(location, disance, tempDate, name, machineCode);
    ctx.body = list;
  }

  static async getList(ctx) {
    const list = await UserModel.findByRole('operation');
    ctx.body = list;
  }

  static async viewPicsByName(ctx) {
    const { date, name } = ctx.request.body;
    const list = await OperationPicModel.findByDateAndName(date, name);
    ctx.body = list;
  }

  static async getStoreList(ctx) {
    const list = await StoreModel.getAllList();
    ctx.body = list;
  }

  static async getStoreDetailById(ctx) {
    const { id } = ctx.request.query;
    const list = await StoreDetailModel.getAllListById(id);
    ctx.body = list;
  }

  /**
   * 领取物料
   */
  static async receiveMaterual(ctx) {
    const {
    } = ctx.request.body;
    const ret = await ReceiveMaterualModel.add(ctx.request.body);
    const res = await StoreDetailModel.decrementNumber(ctx.request.body);
    ctx.body = {
      ret, res,
    };
  }
}
module.exports = operationController;

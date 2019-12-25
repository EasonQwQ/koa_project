/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-unresolved
// import verifyToken from '../utils/util';
// eslint-disable-next-line import/no-unresolved
const rp = require('request-promise');
// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const verifyJwt = require('../utils/util');
const TargetEnterpriseModel = require('../models/target_enterprises');
const BuildingPicModel = require('../models/building_pic');

class targetEnterpriseController {
  static async creater(ctx) {
    const req = ctx.request.body;
    if (req) {
      const ret = await TargetEnterpriseModel.add(req);
      ctx.body = {
        code: 200,
        message: '添加企业成功',
      };
    }
  }


  /**
   * 获取所有企业信息
   */
  static async getAll(ctx) {
    const ret = await TargetEnterpriseModel.getAll();
    ctx.body = ret;
  }

  /**
   * 根据id从楼宇数据库中查找
   */
  static async getPicById(ctx) {
    const req = ctx.request.query;
    const id = parseInt(req.id, 10);
    const ret = await BuildingPicModel.getPicById(id);
    ctx.body = ret;
  }

  /**
   * 给企业添加图片
   */
  static async addPic(ctx) {
    const req = ctx.request.body;
    const {
      bid, address, address2 = null, logo, logo2 = null, officescenes, officescenes2 = null, put, put2 = null, showpower, showpower2 = null,
    } = req;
    const ret = await BuildingPicModel.creater(bid, address, address2, logo, logo2, officescenes, officescenes2, put, put2, showpower, showpower2);
    ctx.body = ret;
  }

  static async viewPicsById(ctx) {
    const req = ctx.request.query;
    const id = parseInt(req.id, 10);
    const ret = await BuildingPicModel.getAllPicById(id);
    ctx.body = ret;
  }

  /**
   *  根据企业id获取企业信息
   */
  static async getInfoById(ctx) {
    const req = ctx.request.query;
    const id = parseInt(req.id, 10);
    const ret = await TargetEnterpriseModel.getInfoById(id);
    ctx.body = ret;
  }

  /**
   * 搜索
   */
  static async search(ctx) {
    const req = ctx.request.query;
    const ret = await TargetEnterpriseModel.getAllByName(req.name);
    ctx.body = ret;
  }
}
module.exports = targetEnterpriseController;

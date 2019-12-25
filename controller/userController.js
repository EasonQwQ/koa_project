// eslint-disable-next-line import/no-unresolved
// import verifyToken from '../utils/util';
// eslint-disable-next-line import/no-unresolved
const rp = require('request-promise');
// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const verifyJwt = require('../utils/util');
const UserModel = require('../models/user');

class userController {
  /**
   * 增加用户
   * @param {*} ctx
   */
  static async creater(ctx) {
    const req = ctx.request.body;
    if (req.openid) {
      const ret = await UserModel.createUser(req);
      ctx.body = {
        code: 200,
        message: '添加人员成功',
      };
    }
  }

  /**
   * 登陆
   */
  static async login(ctx) {
    const { body } = ctx.request;
    const req = await rp({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=xxx&secret=xxx&js_code=${body.code}&grant_type=authorization_code`,
      method: 'get',
    });
    const { openid } = JSON.parse(req);
    let list = await UserModel.findByOpenid(openid);
    if (list.length === 0) {
      list = await UserModel.createUser(openid);
    }
    const token = jwt.sign(list[0].dataValues.id, 'bbtjym');
    ctx.body = {
      token,
      userInfo: list[0].dataValues,
    };
  }

  /**
   * 判断身份
   */
  static async judgeidentity(ctx) {
    const id = verifyJwt.verifyToken(ctx.request.header.authorization);
    const list = await UserModel.findById(id);
    if (list) {
      [ctx.body] = list;
    }
  }

  /**
   * 根据code来判断是不是用户
   */
  static async loginByCode(ctx) {
    const { code } = ctx.query;
    const req = await rp({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=xxx&secret=xxx&js_code=${code}&grant_type=authorization_code`,
      method: 'get',
    });
    const { openid } = JSON.parse(req);
    const data = await UserModel.findByOpenid(openid);
    if (!data) {
      ctx.body = {
        code: 0,
      };
    } else {
      console.log(data.length);
      ctx.body = {
        data, code: 1,
      };
    }
  }

  /**
   * 根据UserName 和 PassWord 来判断
   */
  static async loginByUserNameAndPassword(ctx) {
    const { userName, password, code } = ctx.request.body;
    const req = await rp({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=xxx&secret=xxx&js_code=${code}&grant_type=authorization_code`,
      method: 'get',
    });
    const { openid } = JSON.parse(req);
    const data = await UserModel.findByUserNameAndPassword(userName, password, openid);

    if (data) {
      ctx.body = {
        data, code: 1,
      };
    } else {
      ctx.body = {
        code: 0,
      };
    }
  }
}
module.exports = userController;

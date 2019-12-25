const db = require('../config/db');

const Sequelize = db.sequelize;
const User = Sequelize.import('../schema/user');

User.sync({ force: false });

class UserModel {
  static async createUser(data) {
    const res = await User.create({
      openid: data,
    });
    return res;
  }

  static async findByOpenid(openid) {
    if (openid) {
      const res = await User.findOne({
        where: {
          openid,
        },
      });
      return res;
    }
    throw new Error('no openid');
  }

  static async findById(id) {
    if (id) {
      const res = await User.findAll({
        where: {
          id,
        },
      });
      return res;
    }
    throw new Error('no id');
  }

  static async findByRole(role) {
    if (role) {
      const res = await User.findAll({
        where: {
          role,
        },
      });
      return res;
    }
    throw new Error('no role');
  }

  /**
   * 根据用户名和密码查找用户，如果有的话就返回用户，并将openid修改
   * @param {*} userName 用户名
   * @param {*} password 密码
   * @param {*} openid 微信小程序的唯一标识码
   */
  static async findByUserNameAndPassword(userName, password, openid) {
    const res = await User.findOne({
      where: {
        userName, password,
      },
    });
    if (res) {
      await User.update({
        openid,
      }, {
        where: {
          userName, password,

        },
      });
    }
    return res;
  }
}
module.exports = UserModel;

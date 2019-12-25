const SequelizeOp = require('sequelize');
const db = require('../config/db');

const Sequelize = db.sequelize;
const OperationPic = Sequelize.import('../schema/operation_pic');
const { Op } = SequelizeOp;
OperationPic.sync({ force: false });
class OperationPicModel {
  static async createrRecord(name, date, location, picAddress, disance, time) {
    const res = await OperationPic.create({
      name, date, location, picAddress, disance, time,
    });
    if (res) {
      return res;
    }
    throw new Error('创建错误');
  }

  static async findByDate(date) {
    const res = await OperationPic.findAll({
      where: {
        date: {
          [Op.eq]: date,
        },
      },
    });
    if (res) {
      return res;
    }
    throw new Error('创建错误');
  }

  static async findByDateAndName(date, name) {
    const res = await OperationPic.findAll({
      where: {
        name,
        date: {
          [Op.eq]: date,
        },
      },
    });
    if (res) {
      return res;
    }
    throw new Error('返回数据失败');
  }
}
module.exports = OperationPicModel;

const SequelizeOp = require('sequelize');
const db = require('../config/coffeeHall_db');

const { Op } = SequelizeOp;
const Sequelize = db.sequelize;
const feedback = Sequelize.import('../schema/feedback');
feedback.sync({ force: false });
class feedbackModel {
  static async creater(data) {
    const res = await feedback.create(data);
    if (res) {
      return res;
    }
    throw new Error('创建错误');
  }

  static async getListRewardNotNull() {
    const res = await feedback.findAll({
      where: {
        reward: {
          [Op.ne]: null,
        },

      },
      order: [
        ['date', 'DESC'],
      ],
    });
    return res;
  }

  static async getAll() {
    const res = await feedback.findAll({
      order: [
        ['date', 'DESC'],
      ],
    });
    return res;
  }

  static async updateRewardById(id, reward) {
    const res = await feedback.update({
      reward,
    }, {
      where: { id },
    });
    return res;
  }
}
module.exports = feedbackModel;

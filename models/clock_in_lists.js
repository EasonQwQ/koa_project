const db = require('../config/db');

const Sequelize = db.sequelize;
const ClockInList = Sequelize.import('../schema/clock_in_lists');
ClockInList.sync({ force: false });
class ClockInListModel {
  static async createrRecord(location, disance, date, name, machinecode) {
    const res = await ClockInList.create({
      location, disance, date, name, machinecode,
    });
    if (res) {
      return res;
    }
    throw new Error('创建错误');
  }
}
module.exports = ClockInListModel;

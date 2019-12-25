const SequelizeOp = require('sequelize');
const db = require('../config/db');

const Sequelize = db.sequelize;
const ReceiveMaterual = Sequelize.import('../schema/receive_materual');
const { Op } = SequelizeOp;
ReceiveMaterual.sync({ force: false });
class ReceiveMaterualModel {
  static async add(data) {
    const {
    } = data;
    const temp = JSON.parse(JSON.stringify(data));
    temp.date = `${new Date().toISOString().split('T')[0]} ${new Date().toTimeString().split(' ')[0]}`;
    temp.sid = data.storeId;
    delete (temp.storeId);
    const ret = await ReceiveMaterual.create(temp);
    return ret;
  }
}
module.exports = ReceiveMaterualModel;

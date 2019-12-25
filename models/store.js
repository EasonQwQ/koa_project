const SequelizeOp = require('sequelize');
const db = require('../config/db');

const Sequelize = db.sequelize;
const Store = Sequelize.import('../schema/store');
const { Op } = SequelizeOp;
Store.sync({ force: false });
class StoreModel {
  static async getAllList() {
    const ret = await Store.findAll();
    return ret;
  }
}
module.exports = StoreModel;

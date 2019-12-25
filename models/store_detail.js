const SequelizeOp = require('sequelize');
const db = require('../config/db');

const Sequelize = db.sequelize;
const StoreDetail = Sequelize.import('../schema/store_detail');
const { Op } = SequelizeOp;
StoreDetail.sync({ force: false });
class StoreDetailModel {
  static async getAllListById(id) {
    const ret = await StoreDetail.findOne({
      attributes: [],
      where: {
        sid: id,
      },
    });
    return ret;
  }

  /**
   * 详情仓库减少
   */
  static async decrementNumber(data) {
    console.log('data', data);
    const {
    } = data;
    const ret = await StoreDetail.decrement({
     
    }, {
      where: {
        sid: storeId,
      },
    });
    console.log(ret);
    return ret;
  }
}
module.exports = StoreDetailModel;

const db = require('../config/db');

const Sequelize = db.sequelize;
const buildingPic = Sequelize.import('../schema/building_pic');
buildingPic.sync({ force: false });
class buildingPicModel {
  static async creater() {
    const res = await buildingPic.create({
    });
    if (res) {
      return res;
    }
    throw new Error('创建错误');
  }

  static async getPicById(id) {
    const res = await buildingPic.findOne({
      where: {
        bid: id,
      },
    });
    return !!res;
  }

  static async getAllPicById(id) {
    const res = await buildingPic.findOne({
      where: {
        bid: id,
      },
    });
    return res;
  }
}
module.exports = buildingPicModel;

const SequelizeOp = require('sequelize');
const db = require('../config/db');

const Sequelize = db.sequelize;
const TargetEnterprise = Sequelize.import('../schema/target_enterprises');
const { Op } = SequelizeOp;
TargetEnterprise.sync({ force: false });
class TargetEnterpriseModel {
  static async add(data) {
    const {
      address, building, contact, name, number, position, telephone,
    } = data;
    const ret = await TargetEnterprise.create({
      address, building, contact, name, number, position, telephone,
    });
    return ret;
  }

  static async getAll() {
    const ret = await TargetEnterprise.findAll();
    return ret;
  }

  static async getInfoById(id) {
    const ret = await TargetEnterprise.findOne({
      where: {
        id,
      },
    });
    return ret;
  }

  static async getAllByName(name) {
    const ret = await TargetEnterprise.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return ret;
  }
}
module.exports = TargetEnterpriseModel;

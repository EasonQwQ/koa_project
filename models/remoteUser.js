
const Ssequelize = require('sequelize');
const db = require('../config/remoteDb');

const Sequelize = db.sequelize;
const { Op } = Ssequelize;

const RemoteUser = Sequelize.import('../schema/remoteUser');
const RemoteOrder = Sequelize.import('../schema/remoteOrder');
RemoteUser.belongsTo(RemoteOrder, {
  as: 'order',
  foreignKey:
  'id',
  targetKey: 'userId',
});
RemoteOrder.belongsTo(RemoteUser, {
  as: 'user',
  foreignKey:
  'userId',
  // targetKey: 'userId',
  sourceKey: 'id',
});
RemoteUser.sync({ force: false });
class RemoteUserModel {
  static async getAllUserByWorkUnit(data) {
    const {
      startDate, endDate, workUnit, createStartDate, createEndDate,
    } = data;
    let ret;
    if (!workUnit) {
      ret = await RemoteUser.count({
        where: {
          createDate: {
            [Op.gt]: createStartDate,
            [Op.lt]: new Date(new Date(createEndDate).valueOf() + 24 * 60 * 60 * 1000),
          },
        },
      });
    } else {
      ret = await RemoteUser.count({
        where: {
          workUnit: {
            [Op.like]: `%${workUnit}%`,
          },
          createDate: {
            [Op.gt]: createStartDate,
            [Op.lt]: new Date(new Date(createEndDate).valueOf() + 24 * 60 * 60 * 1000),
          },
        },
      });
    }
    return ret;
  }


  static async getAllUserByWorkUnitAndSignDate(data) {
    const {
      startDate, endDate, workUnit, createStartDate, createEndDate,
    } = data;
    let ret;
    if (workUnit) {
      ret = await RemoteUser.count({
        where: {
          workUnit: {
            [Op.like]: `%${workUnit}%`,
          },
          signinDate: {
            [Op.gt]: startDate,
            [Op.lt]: new Date(new Date(endDate).valueOf() + 24 * 60 * 60 * 1000),
          },
          createDate: {
            [Op.gt]: createStartDate,
            [Op.lt]: new Date(new Date(createEndDate).valueOf() + 24 * 60 * 60 * 1000),
          },
        },
      });
    } else {
      ret = await RemoteUser.count({
        where: {
          signinDate: {
            [Op.gt]: startDate,
            [Op.lt]: new Date(new Date(endDate).valueOf() + 24 * 60 * 60 * 1000),
          },
          createDate: {
            [Op.gt]: createStartDate,
            [Op.lt]: new Date(new Date(createEndDate).valueOf() + 24 * 60 * 60 * 1000),
          },
        },
      });
    }

    return ret;
  }


  static async getUserOrder(data) {
    const {
      startDate, endDate, workUnit,
    } = data;
    // const ret = await RemoteOrder.findAll({
    //   // attributes: [[Sequelize.fn('count', Sequelize.col('B_ORDER.id')), 'no_id']],

    //   include: [{ // include关键字表示关联查询
    //     model: RemoteUser, // 指定关联的model
    //     as: 'user', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
    //     where: {
    //       id: Sequelize.col('user.id'),
    //       workUnit: {
    //         [Op.like]: '%xxx%',
    //       },
    //       // workUnit: 'xxx',
    //     },
    //   }],
    //   // group: Sequelize.col('B_ORDER.id'),
    // });
    const ret = await RemoteUser.findAll({
      // attributes: [[Sequelize.fn('count', Sequelize.col('B_ORDER.id')), 'no_id']],
      where: {
        workUnit: {
          [Op.like]: `%${workUnit}%`,
        },
      },
      include: [{ // include关键字表示关联查询
        model: RemoteOrder, // 指定关联的model
        as: 'order', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        where: {
          id: Sequelize.col('order.id'),

          // workUnit: 'xxx',
        },
      }],
      // group: Sequelize.col('B_ORDER.id'),
    });
    return ret;
  }

  static async getUserByWorkUnit(data) {
    const { workUnit } = data;
    const ret = await RemoteUser.findAll({
      attributes: ['workUnit', [Sequelize.fn('count', Sequelize.col('workUnit')), 'no_workUnit']],
      where: {
        workUnit: {
          [Op.like]: `%${workUnit}%`,
        },
      },
      group: 'workUnit',
    });
    return ret;
  }

  static async getMobileByWorkUnit(workUnit) {
    const ret = await RemoteUser.findAll({
      attributes: ['mobile'],
      where: {
        workUnit: {
          [Op.like]: `%${workUnit}%`,
        },
      },
    });
    return ret;
  }

  static async getOrderByDate(data) {
    const { startDate, endDate, workUnit } = data;
    console.log(startDate, endDate, workUnit);
    const res = await RemoteOrder.findAll({
      where: {
        createDate: {
          [Op.gt]: new Date(startDate),
          [Op.lt]: new Date(new Date(endDate).valueOf() + 24 * 60 * 60 * 1000),

        },
      },
      include: [{ // include关键字表示关联查询
        model: RemoteUser, // 指定关联的model
        as: 'user', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        where: {
          id: Sequelize.col('user.id'),
          workUnit: {
            [Op.like]: `%${workUnit}%`,
          },
          // workUnit: 'xxx',
        },
      }],
    });
    return res;
  }

  static async getUserLevelGt2() {
    const res = await RemoteUser.findAll({
      attributes: ['mobile'],
      where: {
        // memberLevel: {
        //   [Op.gt]: 1,
        // },
        mobile: {
          [Op.regexp]: '^1',
        },
        workUnit: {
         
        },
      },
    });
    return res;
  }
}
module.exports = RemoteUserModel;

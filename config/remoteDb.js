const Sequelize = require('sequelize');

const sequelize = new Sequelize('xxx', 'xxx', 'xxx', {
  host: 'xxx.xxx.xxx.xxx',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: '+08:00',
});
// sequelize.query("show variables like 'character%'").then((result) => {
//   console.log(result);
// });
module.exports = { sequelize };

const Sequelize = require('sequelize');

const sequelize = new Sequelize('xxxxx', 'xxxxx', 'xxxxx.', {
  host: 'xxxxx.xxxxx.xxxxx.xxxxx',
  password: 'xxxxx.',
  dialect: 'mysql',
  operatorsAliases: false,
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

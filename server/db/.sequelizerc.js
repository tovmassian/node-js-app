const path = require('path');
/*
* this file is needed to run command '$ sequelize init' so it will create automatically config and other needed directories
* for this project it is useless anymore because structure is changed
* */
module.exports = {
  "config": path.resolve('./config', 'config.json'),
  "models-path": path.resolve('./models'),
  "seeders-path": path.resolve('./seeders'),
  "migrations-path": path.resolve('./migrations')
};
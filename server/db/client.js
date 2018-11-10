const path = require('path');
const Sequelize = require('sequelize');
const { componentsGetter } = require('../helpers/index');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/config/config.json`)[env];

const db = {};
let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = componentsGetter('model');

models.forEach(item => {
    const model = sequelize.import(path.join(`${__dirname}/../entries/${item.folder}`, item.file));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error(`Unable to connect to the database:${err}`);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

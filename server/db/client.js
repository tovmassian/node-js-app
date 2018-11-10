const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/config/config.json`)[env];

const db = {};
let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(`${__dirname}/../entries`)
    .filter(file => (file.slice(-3) !== '.js'))
    .forEach(folder => {
        fs.readdirSync(path.join(`${__dirname}/../entries`, folder))
            .filter(file => file.slice(-8) === 'model.js')
            .forEach(file => {
                const model = sequelize.import(path.join(`${__dirname}/../entries/${folder}`, file));
                db[model.name] = model;
            });
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

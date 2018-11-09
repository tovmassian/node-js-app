const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./server/models/index');
const appRoutes = require('./server/routes/index');

const app = express();
const port = process.env.PORT || 3000;

appRoutes(app);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error(`Unable to connect to the database:${err}`);
    });

module.exports = app;

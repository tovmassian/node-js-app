const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const { componentsGetter } = require('./server/helpers/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = componentsGetter('route');
routes.forEach(routeItem => {
    const entityPath = `/server/entries/${routeItem.folder}`;
    const routePath = path.join(__dirname, entityPath, routeItem.file);

    app.use('/', require(routePath));
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

module.exports = app;

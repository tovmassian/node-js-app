const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./server/entries/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/private', router.user);

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

module.exports = app;

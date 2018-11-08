const express = require('express');
const Sequelize = require('sequelize');

const appRouter = require('./src/routes/appRoutes')();
const app = express();

app.use(`/`, appRouter);

app.listen(3000, () => {
   console.log(`Server is listening on 3000`);
});

const sequelize = new Sequelize(`postgres://tovmassian:nunu666@localhost:5432/users`);

sequelize
    .authenticate()
    .then(() => {
        console.log(`Connection has been established successfully.`);
    })
    .catch(err => {
        console.error(`Unable to connect to the database:${err}`);
    });
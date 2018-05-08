const NigthSleep =  require('../index');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const config = require('./example.json');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


NigthSleep.initRoutes(app, console, config);

app.listen(3000, () => console.info('App listening on port 3000!'));
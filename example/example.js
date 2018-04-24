const NigthSleep =  require('../index');
const express = require('express');
const app = express();
const config = require('./example.json');

NigthSleep.runServer(app, console, config);

app.listen(3000, () => console.log('App listening on port 3000!'));
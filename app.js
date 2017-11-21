const express = require('express')
, path = require('path')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
, mongoose = require('mongoose')
;

global.db = global.db = mongoose.createConnection('mongodb://localhost/api-example');

const employeesRoutes = require('./routes/employees');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/', employeesRoutes);

module.exports = app;

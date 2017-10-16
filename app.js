const express = require('express')
, path = require('path')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
//, load = require('express-load')
, mongoose = require('mongoose')
;

global.db = global.db = mongoose.createConnection('mongodb://localhost/api-example');

const employees = require('./routes/employees');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/employees', employees);
app.use('/api/employees', employees);

module.exports = app;

require('module-alias/register');

const ENV = require('@env');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const compress = require('compression');
const routes = require('@routers');
const { notFound, lowercasePath,loggerMiddleware } = require('@helpers');
const queryParser = require('express-query-int');

mongoose.connect(ENV.DATABASE, { useNewUrlParser: true });
mongoose.connection
    .on('connected', _ => console.log('Database is successfully connected..'))
    .on('error', _ => console.log('Mongoose connection error..'))
    .on('disconnected', _ => console.log('Mongoose was disconnected..'));


if(ENV.DEBUG) app.use(loggerMiddleware);
app.use(cookieParser());
app.use(cors({ exposedHeaders: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use(helmet());
app.use(compress());
app.use(queryParser());
app.use(lowercasePath())



// API Version
app.use('/api/v1', routes.v1);

//Not Found Handling
app.use(notFound());

module.exports = app
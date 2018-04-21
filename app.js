import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

import config from './config';
import User from './models/user.model';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import fs from 'fs';
import index from './routes/index';
const key = fs.readFileSync('./key/private.key');
const cert = fs.readFileSync('./key/server.crt');
const ca = fs.readFileSync('./key/server.crt');

const serverOptions = {
  key: key,
  cert: cert,
  ca: ca
}
const app = express();
const http = require('https').Server(serverOptions, app);
// set the port
const port = process.env.PORT || 443;

const apiRoutes = express.Router();

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.connect(config.database, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.
});

//Allows crocs read up on best practice
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
  next();
})

//set up bodyParser
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//set up morgan to Requests to console
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

//Tester connection
app.get('/', index);

//app.use('/api/auth', authRoutes);
app.use('/api/user/', userRoutes);

app.use('/api/', authRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// start the server
http.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});

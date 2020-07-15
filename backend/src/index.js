require('dotenv').config({ path: './config/.env' });

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
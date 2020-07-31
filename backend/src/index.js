const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const mongoose = require('mongoose');
const app = express();

mongoose.connect(
  "mongodb+srv://root:admin@users.maiz7.mongodb.net/teste?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
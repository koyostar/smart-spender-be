const express = require('express')
const path = require('path');
const logger = require('morgan');
const cors = require('cors')

require('dotenv').config();
require('./config/database');

const app = express()
let corsOption = {
  origin: ['smart-spender.vercel.app'],
}

app.use(cors(corsOption))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./config/checkToken'))

app.use('/api/users', require('./routes/api/users'));

app.get('/*', function(req, res) {
    res.send("Hello World");
  });

const port = process.env.PORT || 4000;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
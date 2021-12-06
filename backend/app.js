const express = require('express');
var cors = require('cors')
const app = express();
var morgan = require('morgan');
const { nextTick } = require('process');
var faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const port = 3000;
const bodyParser = require('body-parser');

const { exists } = require('fs');

const routes = require('./routes');

app.use(cors({
  origin: '*'
}))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json());
var db = require('./database');

app.use('/api', routes);


app.listen(port, () => {
  console.log(`🎵 carctrl server is listening on port ${port}. `)  
});

module.exports = app;

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
global.config = require('./modules/config')

mongoose.connect(process.env.MONGO, {useNewUrlParser: true, authSource: 'admin'})
mongoose.Promise = global.Promise

app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json({ type : 'application/json' }))
app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'react-client/build')));

const apiRouter = require('./modules/routes');

app.use('/api/v1', apiRouter)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'react-client/build', 'index.html'));
  });

app.listen(config.port , () => {
    console.log(`Server running at Port ${config.port}`)
});

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
global.config = require('./modules/config')

mongoose.connect('mongodb://127.0.0.1:27017/saba3', {useNewUrlParser: true})
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json({ type : 'application/json' }))
app.use(expressValidator())

const apiRouter = require('./modules/routes');

app.use('/api/v1', apiRouter)

app.use('/', (req, res) => res.json("Seems api is running..."))

app.listen(config.port , () => {
    console.log(`Server running at Port ${config.port}`)
});

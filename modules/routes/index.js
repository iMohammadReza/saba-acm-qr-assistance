const express = require('express')
const router = express.Router()

// Controllers
const { controller } = config.path
const ApiController = require(`${controller}/ApiController`)

router.post('/add' , ApiController.add.bind(ApiController))
router.post('/set' , ApiController.set.bind(ApiController))

module.exports = router;

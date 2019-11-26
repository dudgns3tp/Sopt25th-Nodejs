var express= require('express');
var router = express.Router();
const statusCode = require('../../../module/statusCode');
const responseMessage = require('../../../module/responseMessage');
const authUtil = require('../../../module/authUtil');
const Books = require('../../../model/books');

router.get('/', function(req, res) {
    res.send('hello world');
});

module.exports = router;
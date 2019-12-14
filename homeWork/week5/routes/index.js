var express = require('express');
var router = express.Router();

router.use('/blogs', require('./blogs'));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;

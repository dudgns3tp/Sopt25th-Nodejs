var express = require('express');
var router = express.Router({mergeParams:true});

router.use('/:blogIdx/articles', require('./articles'));
router.use('/', require('./blogs'));

module.exports = router;

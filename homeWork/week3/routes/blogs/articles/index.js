var express = require('express');
var router = express.Router({mergeParams:true});

router.use('/:article/comments',require('./comments'));
router.use('/', require('./articles'));

module.exports = router;
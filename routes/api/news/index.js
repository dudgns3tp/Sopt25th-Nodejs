var express = require('express');
var router = express.Router();

router.use('/like', require('./like'));

router.get('/', (req,res)=>{
    res.send('news 카테고리 입니다.');
});

module.exports = router;
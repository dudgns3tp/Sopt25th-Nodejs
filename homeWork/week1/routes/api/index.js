var express = require('express');
var router = express.Router();

router.use('/cafe', require('./cafe'));

router.use('/blog', require('./blog'));

router.use('/news', require('./news'));

router.use('/group', require('./group'));

router.get('/', (req,res)=>{
    res.send('api 카테고리 입니다.');
});

module.exports = router;
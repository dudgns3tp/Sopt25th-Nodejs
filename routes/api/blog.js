var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
    res.send(' blog 카테고리 입니다.');
})

module.exports = router;
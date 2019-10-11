var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
    res.send('like 카테고리');
});

module.exports = router;
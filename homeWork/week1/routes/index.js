var express = require('express');
var router = express.Router();

/* GET home page. */

router.use('/api', require('./api'));

router.get('/', (req,res)=>{
    res.send('express에 온걸 환영.');
});


module.exports = router;

var express = require('express');
var router = express.Router();

router.use('/multerTest', require('./multerTest'));
router.use('/jwtTest', require('./jwtTest'));
router.post('/', (req,res)=>{
    res.send('hello');
})
module.exports = router;

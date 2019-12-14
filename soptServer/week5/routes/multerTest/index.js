var express = require('express');
var router = express.Router();

router.use('/',require('./single'));
router.use('/',require('./array'));
router.use('/',require('./fields'));
router.get('/', (req,res) =>{
    res.send(' express');
})

module.exports = router;
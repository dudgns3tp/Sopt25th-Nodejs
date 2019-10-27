const express = require('express');
const router = express.Router();


router.use('/boards', require('./board'));
router.use('/users',require('./users'));

module.exports = router;

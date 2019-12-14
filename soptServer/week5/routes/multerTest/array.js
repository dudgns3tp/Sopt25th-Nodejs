var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'});

router.post('/array', upload.array('photos', 3), (req,res) =>{
    console.log(req.files);
    console.log(req.body);
    res.send({file:req.files,body:req.body});
})

module.exports = router;
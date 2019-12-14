var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'});

var cpUpload = upload.fields([{name : 'thumbnail', maxCount:1}, {name:'images',maxCount:8}])
router.post('/fields', cpUpload,(req,res)=>{
    console.log(req.files);
    console.log(req.body);
    res.send({file:req.files, body:req.body});
})

module.exports = router;
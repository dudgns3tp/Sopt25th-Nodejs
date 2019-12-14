var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'});

router.post('/single', upload.single('image'),(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    res.send({file:req.file, body:req.body});
})

module.exports = router;

const express = require('express');
const router = express.Router({mergeParams:true});
const authUtil = require('../../../../module/authUtil');
const statusCode = require('../../../../module/statusCode');
const responseMessage = require('../../../../module/responseMessage');
const Comment = require('../../../../model/comment')


router.post('/', (req,res)=>{

});

router.get('/:commentIdx', (req,res) =>{

})


router.put('/:commentIdx', (req,res)=>{

})

router.delete('/:commentIdx', (req,res)=>{

})

module.exports = router; 
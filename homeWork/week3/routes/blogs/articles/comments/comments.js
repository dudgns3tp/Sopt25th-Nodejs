const express = require('express');
const router = express.Router({mergeParams:true});
const authUtil = require('../../../../module/authUtil');
const statusCode = require('../../../../module/statusCode');
const responseMessage = require('../../../../module/responseMessage');
const Comment = require('../../../../model/comment')


router.post('/', (req,res)=>{
    const {blogIdx, articleIdx} = req.params;
    const {commentContent} = req.body;
    /* 파라미터 체크*/
    if(!blogIdx || !articleIdx || !commentContent){
        const missParameters = Object.entries({blogIdx, articleIdx, commentContent})
        .filter(it =>it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    Comment.insert({blogIdx, articleIdx, commentContent})
    .then(({code,json}) =>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    })


});

router.get('/:commentIdx', (req,res) =>{

})

router.get('/', (rea,res)=>{

})


router.put('/:commentIdx', (req,res)=>{

})

router.delete('/:commentIdx', (req,res)=>{

})

module.exports = router; 
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
    //커멘트 삽입
    Comment.insert({blogIdx, articleIdx, commentContent})
    .then(({code,json}) =>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    })
});
/* commentIdx 값으로 comment 조회하기*/
router.get('/:commentIdx', (req,res) =>{
    const {commentIdx} = req.params;
    // 파라미터 체크
    if(!commentIdx){
        res.status(statusCode.BAD_REQUEST).send(authUtil(responseMessage.NULL_VALUE));
    }

    Comment.read({commentIdx})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    })

})
/* LEVEL 4 articleIdx로 전체 댓글 조회하기.*/
router.get('/', (req,res)=>{
    Comment.readAll()
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    })

})


router.put('/:commentIdx', (req,res)=>{
    const {commentContent} = req.body;
    const {commentIdx} = req.params;

    if(!commentContent || !commentIdx){
        const missParameters = Object.entries({commentIdx,commentContent})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    Comment.update({commentIdx,commentContent})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
})

router.delete('/:commentIdx', (req,res)=>{
    const {commentIdx} = req.params;

    if(!commentIdx){
        res.status(statusCode.BAD_REQUEST).res(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Comment.delete({commentIdx})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });

})

module.exports = router; 
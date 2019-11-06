const express = require('express');
const router = express.Router({mergeParams:true});
const authUtil = require('../../../module/authUtil');
const statusCode = require('../../../module/statusCode');
const responseMessage = require('../../../module/responseMessage');
const Article = require('../../../model/article')


router.get('/:articleIdx', (req,res)=>{
    const {articleIdx} = req.params;
    if(!articleIdx){
        const missParameters =Object.entries({articleIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }

    Article.read({articleIdx})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    })


})

router.get('/', (req,res) =>{
    const {blogIdx} = req.params;
    if(!blogIdx){
        const missParameters =Object.entries({title, blogIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }

    Article.readAll(blogIdx)
    .then(({code, json})=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    })



})

router.post('/', (req,res)=>{
    const { title, content} = req.body;
    const {blogIdx} = req.params;
    if(!blogIdx || !title || !content){
        const missParameters = Object.entries({title, content})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    Article.insert({blogIdx, title, content})
    .then(({code, json})=> {
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });

});

router.put('/:articleIdx', (req,res)=>{
    const {title, content} = req.body;
    const {articleIdx} = req.params;

    if(!title || !content || ! articleIdx){
        const missParameters = Object.entries({title,content})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    Article.update({articleIdx, title, content})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
})

router.delete('/:articleIdx', (req,res)=>{
    const {articleIdx} = req.params;

    if(!articleIdx){
        res.status(statusCode.BAD_REQUEST).res(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Article.delete({articleIdx})
    .then(({code,json})=>{
        res.status(code).send(json);
    }).catch(err =>{
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });

})

module.exports = router; 
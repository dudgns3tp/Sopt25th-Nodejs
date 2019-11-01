var express = require('express');
var router = express.Router();
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const authUtil = require('../../module/authUtil');
const Blog = require('../../model/blogs')

router.post('/',async(req,res)=>{
    const {blogName} = req.body;
    //TODO 1 : blogname값 확인하기
    if(!blogName){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }

    //TODO 2: 작성하기
    try{
        const {code, json} = await Blog.insert(blogName);
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    }
});

router.get('/', async(req,res)=>{
    try{
        const {code, json} = await Blog.selectAll();
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    }
});

router.get('/:blogIdx', async(req,res)=>{
    const blogIdx = req.params;
    //TODO 1: 인덱스 유효여부확인
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }

    //TODO 2: 가져오기
    try{
        const {code, json} = await Blog.selectOne(blogIdx);
        res.status(code).send(json);
    } catch(err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    }
});

router.put('/:blogIdx',async(req,res) =>{
    const {blogIdx} = req.params;
    const {blogName} = req.body;
    //TODO 1: 인덱스 체크
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }
    //TODO 2: 수정하기
    try{
        const {code,json} = await Blog.update(blogIdx,blogName);
        res.status(code).send(json);
    } catch(err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).wend(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    }
})

router.delete('/:blogIdx', async(req,res)=>{
    const {blogIdx} = req.params;

    try{
        const {code,json} = await Blog.delete(blogIdx);
        res.status(code).send(json);
    } catch(err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).wend(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    }
})

module.exports = router;

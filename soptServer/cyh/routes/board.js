const express = require('express');
const router  = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const Board = require('../model/board');

router.get('/',(req,res)=>{
    Board.readAll
})// todo: 게시글 전체보기
router.get('./:id',(req,res)=>{ })// todo: 게시글 전체보기
router.post('./',(req,res)=>{ })// todo: 게시글 전체보기
router.put('/',(req,res)=> { }) // 게시글 수정
router.delete('/',(req,res) => { })// 게시글 삭제하기

module.exports = router;
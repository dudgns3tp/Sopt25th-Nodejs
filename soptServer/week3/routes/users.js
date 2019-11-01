var express = require('express');
var router = express.Router();
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const User= require('../model/user');
const pool = require('../module/pool');
/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  const {
    id,
    pwd,
    name,
    address
  } = req.body;

  console.log(id,pwd,name,address);

  //파라미터 오류 체크!
  if(!id||!pwd||!name||!address){
    res.statusCode(statusCode.BAD_REQUEST)
    .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
  }

  //아이디 중복체크 및 promise 응답
  User.signup(id,pwd,name,address)
  .then(({code,json})=> res.status(code).send(json))
  .catch(err=> {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR,
      authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
  })

});

/*
[POST]localhost:3000/user/signup
request body
{
  "id":"아이디"
  "pwd":"비밀번호"
}

response
1.성공
2.파라미터 오류
3.아이디 가 존재하지않음
4.비밀번호 오류
5. 서버 오류

 */
router.post('/signin', (req, res) => {
  const{id, pwd} = req.body;
  //파라미터 오류
  if(!id||!pwd){
    res.status(statusCode.BAD_REQUEST)
    .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
  }
  User.signin(id,pwd)
  .then(({code,json})=> res.status(code).send(json))
  .catch(err =>{
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR,
      authUtil(responseMessage.INTERNAL_SERVER_ERROR))
  });

  //로그인 인증하기

  //user가 존재하는지 체크
  //const user = User.userDB.find(it=>it.)
})

module.exports = router;

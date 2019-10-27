var express = require('express');
var router = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const User = require('../model/user');


/*
[POST]localhost:3000/user/signup
request body
{
   "id":"아이디"
   "pwd":"비밀번호"
   "name":"이름"
   "address":"주소"
}

response
1.성공
2.파라미터 오류
3.아이디 중복
4.서버 오류

 */

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req,res)=>{
  const {
    id,
    pwd,
    name,
    address
  } = req.body;

  //파라미터 오류
  if(!id||!pwd|| !name|| !address){
    res.status(statusCode.BAD_REQUEST)
    .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
  }

  //아이디 중복 체크
  User.signup(id,pwd,name,address)
  .then(({code,json})=> res.status(code).send(json))
  .catch((err)=>{
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR)
    .send(responseMessage.INTERNAL_SERVER_ERROR);
  });

// 회원가입 성공
  const user = {
    id,
    pwd,
    name,
    address
  };
  User.userDB.push(user);
  console.log(User.userDB);
  

  const result = user;
  res.status(statusCode.OK)
  .send(authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS));


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
router.post('/signin',(req,res)=>{
  const{id, pwd} = req.body;
   //파라미터 오류
    if(!id||!pwd){
    res.status(statusCode.BAD_REQUEST)
    .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
  }

  User.signin(id,pwd)
  .then(({code,json})=>{
    res.status(code).send(json);
  }).catch(err =>{
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
  });

  //user가 존재하는지 체크
  const user =User.userDB.find(it=>it.id == id ); //find는 하나만 발견 filter는 다 발견
  console.log(user);

});



module.exports = router;

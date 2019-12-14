var express = require('express');
var router = express.Router();
const statusCode = require('../../Module/statusCode');
const authUtil = require('../../Module/authUtil');
const responseMessage = require('../../Module/responseMessage');
const jwt = require('../../Module/jwt');

router.post('/publish', (req,res)=>{
    const {idx,grade,name} = req.body;
    if(!idx || !grade || !name){
        res.send('wrong parameter');
        return;
    }
    const result = jwt.sign({idx,grade,name});
    res.json(result);
})

router.post('/verify', (req,res)=>{
    const {token} = req.headers;
    const result = jwt.verify(token);
    if(result == -1){
        return res.status(statusCode.UNAUTHORIZED)
        .send(authUtil.successFalse(responseMessage.EXPIRED_TOKEN));
    }
    if(result ==-2){
        return res.status(statusCode.UNAUTHORIZED)
        .send(authUtil.successFalse(responseMessage.INVALID_TOKEN));
    }
    res.json(result);
})

router.post('/refresh',(req,res)=>{
    const refreshToken = req.headers.refreshToken;
    const selectUser ={
        idx:1,
        grade:1,
        id:'genie',
        name:'genie'
    };

    const newAccessToken = jwt.refresh(selectUser);
    res.status(statusCode.OK).send(authUtil.successTrue(responseMessage.REFRESH_TOKEN,newAccessToken));

})
module.exports = router;
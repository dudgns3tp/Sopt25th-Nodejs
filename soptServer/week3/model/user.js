const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const UserDB = [];

module.exports = {
    signin:(id, pwd)=> {
        return new Promise((resolve, reject)=>{
            //존재하는 아이디인지 체크
            const user = UserDB.find(it =>it.id = id);
            console.log(user);
            if(!user){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.NO_USER)
                });
                return;
            }

            //비밀번호 일치하는지 체크
            if(user.pwd != pwd){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }

            //4.유저 정보 응답하기
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS)
            });
        });
    },
    signup:(id,pwd,name,address) => {
        return new Promise((resolve, reject) =>{
            // 1. 존재하는 아이디인지 확인한다.
            if(UserDB.filter(it => it.id == id).length >0){
                resolve({
                    code:statusCode.UNAUTHORIZED,
                    json:authUtil.successFalse(responseMessage.ALREADY_ID)
                });
                return;
            }
            //2. 사용자 정보를 저장한다.
            const userIdex = UserDB.push({
                id,
                pwd,
                name,
                address
            });
            console.log(UserDB);

            //새로 추가한 유저 index 반환하기
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS)
            });
        });
    }

    
}
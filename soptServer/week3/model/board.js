const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const boardDB = [];

module.exports = {
    create: (title, content, writer, pwd) => {
        return new Promise((resolve, reject) => {
            const idx = boardDB.push({
                title,
                content,
                writer,
                pwd,
                time: Date.now()
            });
            console.log(boardDB[boardDB.length - 1]);
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(
                    responseMessage.BOARD_CREATE_SUCCESS,
                    idx
                )
            });
        });
    },
    readAll: () => {
        return new Promise((resolve, reject) => {
            console.log(boardDB);
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_READ_ALL_SUCCESS,
                    boardDB)
            });
        });
    },
    read: (idx) => {
        return new Promise((resolve, reject) => {
            if (idx >= boardDB.length) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_READ_SUCCESS,
                    boardDB[idx])
            });
        });
    },
    update: (idx,title,content,writer, pwd) =>{
        return new Promise((resolve, reject)=>{
            //idx값 확인
            if(idx>boardDB.length){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }
            //비밀번호 확인
            if(boardDB[idx].pwd != pwd){
                resolve({
                    code:statusCode.FORBIDDEN,
                    json:authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            boardDB[idx].title = title;
            boardDB[idx].content = content;
            boardDB[idx].writer = writer;
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS, boardDB[idx])
            });
        });
    },
    delete: (idx, pwd)=>{
        return new Promise((resolve, reject) =>{
            //idx값 확인
            if(idx>=boardDB.length){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }
            //비밀번호 체킹
            if(boardDB[idx].pwd != pwd){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            boardDB[idx] = {};
            resolve({
                code: statusCode.OK,
                json:authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS)
            });
        });
    }

}
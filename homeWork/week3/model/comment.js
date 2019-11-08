const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const pool = require('../module/pool');
const table = 'comment';
/*
commentIdx, content
*/

module.exports ={
    insert: async({blogIdx, articleIdx, commentContent}) =>{
        const fields = 'blogIdx, articleIdx, commentContent';
        const questions = `'${blogIdx}', '${articleIdx}', '${commentContent}'`;
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.COMMENT_CREATE_FAIL)
            }
        }
        console.log(result);
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.COMMENT_CREATE_SUCCESS, result)
        };
    },
    read : async()=>{

    },
    readAll : async()=>{

    },
    update : async () =>{

    },
    delete : async ()=>{

    }
}
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
    /* 커멘트 인덱스로 해당 댓글 조회 */
    read : async({commentIdx})=>{
        const fields = 'commentIdx';
        const questions = `'${commentIdx}'`;
        const query = `SELECT * FROM ${table} WHERE (${fields}) = ${questions}`;
        const result = await pool.queryParam_None(query);
        
        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.COMMENT_READ_FAIL)
            }
        }

        console.log(result);
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.COMMENT_READ_SUCCESS, result)
        }
    },
    /* 블로그, 아티클 무관 모든 댓글을 조회 */
    readAll : async()=>{
        const query = `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.COMMENT_READ_ALL_FAIL)
            }
        }
        console.log(result);
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.COMMENT_READ_ALL_SUCCESS, result)
        }
    },
    update : async({commentIdx, commentContent}) =>{
        const query = `UPDATE ${table} SET commentContent= '${commentContent}' WHERE commentIdx = '${commentIdx}'`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.ARTICLE_UPDATE_FAIL)
            }
        }
        console.log(result);
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.ARTICLE_UPDATE_SUCCESS, result)
        }
    },
    delete : async({commentIdx}) =>{
        const query = `DELETE FROM ${table} WHERE commentIdx = '${commentIdx}'`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.ARTICLE_DELETE_FAIL)
            }
        }
        console.log(result);
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.ARTICLE_DELETE_SUCCESS, result)
        }
    }
}
const authUtil = require('../module/authUtil');
const responseMessage = require('../module/responseMessage');
const statusCode = require('../module/statusCode');
const pool = require('../module/pool');

const table = 'article';
module.exports ={
    
    insert: async ({blogIdx, title, content}) =>{
        const fields ='blogIdx, title, content';
        const questions = `'${blogIdx}', '${title}','${content}'`;
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
        const result = await pool.queryParam_None(query);
        
        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.ARTICLE_CREATE_FAIL)
            };
        }
        console.log(result);
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.ARTICLE_CREATE_SUCCESS, result)
        };
    },
    read: async({articleIdx}) =>{
        const fields = 'articleIdx';
        const questions = `'${articleIdx}'`;
        const query = `SELECT * FROM ${table} WHERE (${fields}) = (${questions})`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.ARTICLE_READ_ONE_FAIL)
            }
        }
        console.log(result);
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.ARTICLE_READ_ONE_SUCCESS, result)
        }
    },
    readAll : async(blogIdx) =>{
        const fields = 'blogIdx';
        const questions = `'${blogIdx}'`;
        const query = `SELECT * FROM ${table} WHERE (${fields}) = (${questions})`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.ARTICLE_READ_ALL_FAIL)
            }
        }

        console.log(result);
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.ARTICLE_READ_ALL_SUCCESS, result)
        }
    }
}
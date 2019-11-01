const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const pool = require('../module/pool');

const table = 'blog';
module.exports = {
    insert: async(blogName) => {
        const fields = 'blogName';
        const questions = `'${blogName}'`;
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
        const result = await pool.queryParam_None(query);
        
        //running
        if(!result) {
            return {
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BLOG_CREATE_FAIL)
            };
        }
        
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BLOG_CREATE_SUCCESS, result)
        };
    },
    selectOne : async(blogIdx) =>{
        const query= `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}'`;
        const result = await pool.queryParam_None(query);

        if(!result) {
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BLOG_READ_FAIL)
            };
        }

        return {
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BLOG_READ_SUCCESS)
        };
    },
    update: async(blogIdx, blogName) =>{
        const query = `UPDATE ${table} SET blogName = '${blogName}' WHERE blogIdx = 
        ${blogIdx}`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BLOG_UPDATE_FAIL)
            };
        }
        
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BLOG_UPDATE_SUCCESS)
        };
    },
    selectAll: async() =>{
        const query = `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BLOG_READ_ALL_FAIL)
            };
        }
        
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BLOG_READ_ALL_SUCCESS)
        };
    },
    delete: async(blogIdx) =>{
        const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx}`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BLOG_DELETE_FAIL)
            };
        }
        
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BLOG_DELETE_SUCCESS)
        };
    }
}
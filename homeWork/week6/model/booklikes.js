const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const pool = require('../module/pool');
// 책장속 발견 
const table = 'book';
module.exports ={
    selectAll : async() =>{
        const query= `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query);
    
        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BOOK_READ_ALL_FAIL)
            };
        }
        console.log(result);
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BOOK_READ_ALL_SUCCESS,result)
            
        };
    }
}
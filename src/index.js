/**
 * Created by rohanak on 11/17/17.
 */

//import claudia rest api wrapper
import API from 'claudia-api-builder';
const AWS = require('aws-sdk');
const TABLE_NAME = "todo";

const api=new API();

const documentClient = new AWS.DynamoDB.DocumentClient();

const saveData=async (record)=>{
     await documentClient
        .put({
            TableName: TABLE_NAME,
            Item:{
                key:"rohana-to-do",
                data:record
            }
        })
        .promise();
     return record;
};


const toto=async (body)=>{
    return saveData(body);
};
const totoById=(id)=> {
    return {id};
};

api.get("/version",()=>{return {version:"1.0.1"}});
api.post("/todos",(request)=>  toto(request.body));
api.post("/todo/{id}",(request)=>  totoById(request.pathParams.id));


module.exports=api;


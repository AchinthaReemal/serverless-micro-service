/**
 * Created by rohanak on 11/17/17.
 */

//import claudia rest api wrapper
import API from 'claudia-api-builder';
const AWS = require('aws-sdk');
const api=new API();
const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME=`todo-rohana-${process.env.ENV?process.env.ENV:''}`;

const saveData=async (record,userId)=>{
     await documentClient
        .put({
            TableName: TABLE_NAME,
            Item:{
                key:userId,
                data:record
            }
        })
        .promise();
     return record;
};

const getData=async (userId)=>{
    const data = await documentClient
        .get({
            TableName: TABLE_NAME,
            Key: {key:userId}
        })
        .promise();
    if (!data.Item) throw Error(`No data found for key: ${key}`);
    return data.Item.data;
};

const saveToDo=async (todos,userId)=>{
    return saveData(todos,userId);
};
const getToDo=async (userId)=> {
    return getData(userId);
};
api.get("/version",()=>{return {version:"1.0.0"}});

module.exports=api;


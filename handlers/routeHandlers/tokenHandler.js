// Dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilites');
const { parseJson } = require('../../helpers/utilites');
const { createRandomString } = require('../../helpers/utilites');

// Module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptMethods = ['get', 'post', 'put', 'delete'];
    if (acceptMethods.indexOf(requestProperties.method) !== -1) {
        handler._tokens[requestProperties.method](requestProperties, callback);
    } else {
        callback(404, {
            msg: '404 page not found',
        });
    }
};

handler._tokens = {};

// Create new user
handler._tokens.post = (requestProperties, callback) => {
    // validation
    const phoneNumber = typeof (requestProperties.body.phoneNumber) === 'string' && requestProperties.body.phoneNumber.trim().length === 11 ? requestProperties.body.phoneNumber : false;
    const userPassword = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.length > 0 ? requestProperties.body.password : false;
    if (phoneNumber && userPassword) {
        data.readData('users',phoneNumber,(err,uData)=>{
            let userData = parseJson(uData);
            let hashPasswordk = hash(userPassword);
            if(hashPasswordk === userData.userPassword)
            {
              let tokenId = createRandomString(20);
              let expires = Date.now()+60*60*1000;
              let tokenObject={
                tokenId:tokenId,
                phoneNumber:phoneNumber,
                expires:expires
              }
            data.createData('tokens',tokenId,tokenObject,(err1)=>{
                if(!err1)
                {
                    callback(200,tokenObject) 
                }else{
                    callback(500, {
                        msg: "server side error"
                    })   
                }
            });
            }else{
                callback(400, {
                    msg: "Your password or phone number is in-valid"
                }) 
            }
        });
    } else {
        callback(400, {
            msg: "Please provide data in JSON format"
        });
    }
};

// Read a user
handler._tokens.get = (requestProperties, callback) => {
    // validation
    const tokenId = typeof (requestProperties.queryStringObject.id) === 'string' ? requestProperties.queryStringObject.id : false;

    if(!tokenId)
    {
     callback(402,{
        error : "Please enter valid token id"
     })
    }
    data.readData('tokens',tokenId,(err,data)=>{
        let tokenData = {...parseJson(data)};
        if(tokenData)
        {
            callback(200,tokenData);
        }
    });



};

// PUT/Update a user
handler._tokens.put =(requestProperties, callback) =>{
    //validation
    const tokenId = typeof (requestProperties.body.id) === 'string' && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id : false;
    const extend = typeof (requestProperties.body.extend) === 'boolean' && requestProperties.body.extend === true ? true : false;
    //get user by phone number
    if(tokenId){
        data.readData('tokens',tokenId,(err,tokenData)=>{
         let tokenObj = parseJson(tokenData);   
         if(tokenObj.expires > Date.now()){
            tokenObj.expires = Date.now()+60*60*1000;
            data.updateData('tokens',tokenId,tokenObj,(err1)=>{
                if(!err1){
                    callback(200,{
                        success : 'Token expire time updated'
                    });
                }else{
                    callback(505,{
                        error : 'server side error'
                    });
                }
            });
         }else{
            callback(405,{
                error : 'Token already expire'
            });
         }
        });
    }else{
        callback(505,{
            error : 'server side error'
        });
    }
}

// Delete user data
handler._tokens.delete=(requestProperties,callback) =>{
    const tokenId = typeof (requestProperties.queryStringObject.id) === 'string' ? requestProperties.queryStringObject.id : false;
    if(tokenId){
     //prepare updat data
     data.readData('tokens',tokenId,(err,uData)=>{
        let userData = parseJson(uData);
        if(!err && userData)
        {
        // update user data 
        data.deleteData('tokens',tokenId,(err1)=>{
            if(!err1)
            {
                callback(505,{
                    success : 'Token delete successfully'
                });   
            }else{
                callback(505,{
                    error : 'Something happen or provide in-correct data'
                });
            }
        });
        }
    });
    }

}
module.exports = handler;

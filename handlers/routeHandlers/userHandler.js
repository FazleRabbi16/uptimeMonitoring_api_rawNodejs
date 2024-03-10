// Dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilites');
const { parseJson } = require('../../helpers/utilites');

// Module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptMethods = ['get', 'post', 'put', 'delete'];
    if (acceptMethods.indexOf(requestProperties.method) !== -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(404, {
            msg: '404 page not found',
        });
    }
};

handler._users = {};

// Create new user
handler._users.post = (requestProperties, callback) => {
    // validation
    const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const phoneNumber = typeof (requestProperties.body.phoneNumber) === 'string' && requestProperties.body.phoneNumber.trim().length === 11 ? requestProperties.body.phoneNumber : false;
    const userPassword = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.length > 0 ? requestProperties.body.password : false;
    const tosSign = typeof (requestProperties.body.tosSign) === 'boolean' ? requestProperties.body.tosSign : false;
    if (firstName && lastName && phoneNumber && userPassword && tosSign) {
        // Check if user exists or not via phone number
        data.readData('users', phoneNumber, (err) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phoneNumber,
                    password: hash(userPassword),
                    tosSign
                };

                // Store data in DB
                data.createData('users', phoneNumber, userObject, (err1) => {
                    if (!err1) {
                        callback(200, {
                            msg: 'User created successfully'
                        });
                    } else {
                        callback(500, {
                            msg: 'User creation failed'
                        });
                    }
                });
            } else {
                callback(500, {
                    msg: 'User already exist with this phone number'
                });
            }
        });
    } else {
        callback(400, {
            msg: "Please provide data in JSON format"
        });
    }
};

// Read a user
handler._users.get = (requestProperties, callback) => {
    // validation
    const phoneNumber = typeof (requestProperties.queryStringObject.phoneNumber) === 'string' && requestProperties.queryStringObject.phoneNumber.trim().length === 11 ? requestProperties.queryStringObject.phoneNumber : false;
    if(!phoneNumber)
    {
     callback(402,{
        error : "Please enter 11 digit valid(ex: 016xxxxxxxx) phone number"
     })
    }
    data.readData('users',phoneNumber,(err,data)=>{
        let userData = {...parseJson(data)};
        if(userData)
        {
            delete userData.password;
            callback(200,userData);
        }
    });



};

// PUT/Update a user
handler._users.put =(requestProperties, callback) =>{
    //validation
    const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
    const phoneNumber = typeof (requestProperties.body.phoneNumber) === 'string' && requestProperties.body.phoneNumber.trim().length === 11 ? requestProperties.body.phoneNumber : false;
    const userPassword = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.length > 0 ? requestProperties.body.password : false;
    //get user by phone number
    if(phoneNumber){
        if(firstName || lastName || userPassword){
            //prepare updat data
            data.readData('users',phoneNumber,(err,uData)=>{
                let userData = parseJson(uData);
                if(!err && userData)
                {
                    if(firstName)
                    {
                     userData.firstName=firstName;
                    }
                    if(lastName)
                    {
                     userData.lastName = lastName;
                    }
                    if (userPassword) {
                      userData.userPassword = hash(userPassword);
                    }
                // update user data 
                data.updateData('users',phoneNumber,userData,(err1)=>{
                    if(!err1)
                    {
                        callback(505,{
                            success : 'User updated successfully'
                        });   
                    }else{
                        callback(505,{
                            error : 'Something happen or provide in-correct data'
                        });
                    }
                });
                }
            });
        }else{
            callback(505,{
                error : 'May find some problem with your request'
            });
        }
    }else{
        callback(505,{
            error : 'user not found with this phone number'
        });
    }
}

// Delete user data
handler._users.delete=(requestProperties,callback) =>{
    const phoneNumber = typeof (requestProperties.queryStringObject.phoneNumber) === 'string' && requestProperties.queryStringObject.phoneNumber.trim().length === 11 ? requestProperties.queryStringObject.phoneNumber : false;
    if(phoneNumber){
     //prepare updat data
     data.readData('users',phoneNumber,(err,uData)=>{
        let userData = parseJson(uData);
        if(!err && userData)
        {
        // update user data 
        data.deleteData('users',phoneNumber,(err1)=>{
            if(!err1)
            {
                callback(505,{
                    success : 'User delete successfully'
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

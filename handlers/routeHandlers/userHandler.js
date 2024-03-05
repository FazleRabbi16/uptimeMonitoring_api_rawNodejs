// Dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilites');

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

// Get user
handler._users.get = (requestProperties, callback) => {
    callback(200);
};

module.exports = handler;

/*
 Title: Uptime monitoring application
 Description : User can check their given link status like up or down
 Author: Fazle Rabbi
 Data : 28 feb 2024
*/ 
const http = require('http');
const { hendleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};
// data create in lib/data.js folder
// data.createData('test','newFile',{'name':'Akbar','language':'bangla'},(err)=>{
//     console.log(err);
// });
// data read in lib/data.js folder
data.readData('test','newFile',(err,data)=>{
    console.log(err,data);
});
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port,()=>{
        console.log('server is on at port '+ environment.port);
    });
}
app.handleReqRes = hendleReqRes;
app.createServer();
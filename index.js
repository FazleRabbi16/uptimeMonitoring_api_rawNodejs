/*
 Title: Uptime monitoring application
 Description : User can check their given link status like up or down
 Author: Fazle Rabbi
 Data : 28 feb 2024
*/ 
const http = require('http');
const { hendleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');

// app object - module scaffolding
const app = {};

app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port,()=>{
        console.log('server is on at port '+ environment.port);
    });
}
app.handleReqRes = hendleReqRes;
app.createServer();
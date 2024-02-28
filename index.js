/*
 Title: Uptime monitoring application
 Description : User can check their given link status like up or down
 Author: Fazle Rabbi
 Data : 28 feb 2024
*/ 

const http = require('http');

// app object - module scaffolding
const app = {};
// configuration
app.config={
    port : 8080,
}

app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port,()=>{
        console.log('server is on at port '+app.config.port);
    });
}

app.handleReqRes = (req,res) =>{
   res.end('server run');
}

app.createServer();
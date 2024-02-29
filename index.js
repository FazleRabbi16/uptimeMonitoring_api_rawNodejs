/*
 Title: Uptime monitoring application
 Description : User can check their given link status like up or down
 Author: Fazle Rabbi
 Data : 28 feb 2024
*/ 

const http = require('http');
const url = require('url');
const {StringDecoder}= require('string_decoder');

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
    // get the url and parse 
    const parseUrl = url.parse(req.url, true);
    const pathName = parseUrl.pathname;
    // Use a regular expression to remove unwanted characters
    const formatedPath = pathName.replace(/^\/+|\/+$/g, ''); 
    const method = req.method.toLowerCase();  
    const queryStringObject = parseUrl.query;
    const metaDataObject = req.headers;
    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data',(buffer)=>{
       realData += decoder.write(buffer);
    });
    req.on('end',()=>{
        realData += decoder.end();
        console.log(realData);
        res.end('Real data end');
     });
    console.log(metaDataObject);
    res.end('server run at port '+app.config.port);
}

app.createServer();
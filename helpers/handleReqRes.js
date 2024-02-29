// Build-in module
const url = require('url');
const {StringDecoder}= require('string_decoder');
//handler object - module scaffoliding 
const handler = {};

handler.hendleReqRes = (req,res) =>{
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
}

module.exports = handler;
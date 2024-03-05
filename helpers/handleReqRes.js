// Build-in module
const url = require('url');
const {StringDecoder}= require('string_decoder');
const routes = require('../route');
const {sampleHandler}= require('../handlers/routeHandlers/sampleHandler');
const {notFoundHandler}= require('../handlers/routeHandlers/notFoundHandler');
const {parseJson}= require('./utilites');
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
    // chose by handler to invoke function 
   let choosenHandler = routes[formatedPath] ? routes[formatedPath] : notFoundHandler;
   //request properties 
   const requestProperties = {
      parseUrl,
      pathName,
      formatedPath,
      method,
      queryStringObject,
      metaDataObject
   }; 
  
    req.on('data',(buffer)=>{
       realData += decoder.write(buffer);
       // need to parsing it
       requestProperties.body = parseJson(realData);
    });
    req.on('end',()=>{
        realData += decoder.end();
        choosenHandler(requestProperties,(statusCode,payload)=>{
         statusCode = typeof(statusCode) === 'number' ? statusCode : 500 ;
         payload = typeof(payload) === 'object' ? payload : {};
         payloadString = JSON.stringify(payload);
         // set in response in json formate by header
         res.setHeader('content-type','application/json');
         // return the final result 
         res.writeHead(statusCode);
         res.end(payloadString);
       });
     });   
}
module.exports = handler;
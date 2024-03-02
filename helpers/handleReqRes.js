// Build-in module
const url = require('url');
const {StringDecoder}= require('string_decoder');
const routes = require('../route');
const {sampleHandler}= require('../handlers/routeHandlers/sampleHandler');
const {notFoundHandler}= require('../handlers/routeHandlers/notFoundHandler');
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
   const choosenHandler = routes[formatedPath] ? routes[formatedPath] : notFoundHandler;
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
    });
    req.on('end',()=>{
        realData += decoder.end();
        choosenHandler(requestProperties,(statusCode,payload)=>{
         statusCode = typeof(statusCode) === 'number' ? statusCode : 500 ;
         payload = typeof(payload) === 'object' ? payload : {};
         payloadString = JSON.stringify(payload);
         res.writeHead(statusCode);
         res.end(payloadString);
       });
        res.end('Real data end');
     });   
}
module.exports = handler;
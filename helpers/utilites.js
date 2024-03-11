// Build-in module 
const crypto = require('crypto');
// dependencies
const environment = require('./environment');
// module scaffolding
const utilities = {};
// parsing JSON string to object
utilities.parseJson = (jsonString)=>{
   let output;
   try {
     output = JSON.parse(jsonString);
   } catch (error) {
    output={};
   }
   return output;
}

utilities.hash=(str)=>{
 
   if(typeof(str)==='string' && str.length > 0)
   {
    const hashPassword = crypto.createHmac('sha256',environment.secretKey).update(str).digest('hex');
    return hashPassword;
   }else{
    return false;
   }
}
utilities.createRandomString=(strLength)=>{
   let length = strLength;
   length = typeof(length)==='number' && length > 0 ? length:false;
  if(length){
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i <= length; i++) {
         result += characters.charAt(Math.floor(Math.random() * length));
    }
   return result;
  }else{
   return false;
  }
}
//export environment
module.exports = utilities; 
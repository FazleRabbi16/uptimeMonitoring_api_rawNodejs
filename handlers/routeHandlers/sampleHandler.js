const handler ={};
handler.sampleHandler=(requestProperties,callback)=>{
   callback(200,{
    msg:"This is sample URL",
   });
}
module.exports=handler;
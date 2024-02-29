const handler ={};
handler.notFoundHandler=(requestProperties,callback)=>{
    console.log('404  URL NOT Found');
    callback(404,{
        msg:"URL not found",
    });
}
module.exports=handler;
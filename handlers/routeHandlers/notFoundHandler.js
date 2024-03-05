const handler ={};
handler.notFoundHandler=(requestProperties,callback)=>{
    console.log('404  URL NOT Found');
    callback(404,{
        msg:"404 Page Not Found",
    });
}
module.exports=handler;
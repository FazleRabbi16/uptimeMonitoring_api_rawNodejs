/*
all the data CRUD operation here
*/ 
// Dependencies
const fs = require('fs');
const path = require('path');
//module scafolding
const library = {};
//base directory of the data folder
library.baseDir = path.join(__dirname,'../.data/');
// write dat to file 
library.createData = (dir,fileName,data,callback)=>{
   fs.open(library.baseDir+dir+'/'+fileName+'.json','wx',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
         //conver data to string   
         const stringData = JSON.stringify(data);
         fs.writeFile(fileDescriptor,stringData,(err2)=>{
            if(!err2){
                fs.close(fileDescriptor,(err3)=>{
                    if(!err3){
                        callback(false);
                    }else{
                        callback('Error closing the new file');
                    }
                });
            }
         });
        }else{
          callback(err);
        }
   });
}

// read data from file 
library.readData = (dir,fileName,callback)=>{
   fs.readFile(library.baseDir+dir+'/'+fileName+'.json','utf8',(err,data)=>{
      callback(err,data);
   })
}
// update data in file
library.updateData =(dir,fileName,data,callback)=>{
    fs.open(library.baseDir+dir+'/'+fileName+'.json','r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
         //conver data to string   
         const stringData = JSON.stringify(data);
         fs.ftruncate(fileDescriptor,(err1)=>{
            if(!err1){
                fs.writeFile(fileDescriptor,stringData,(err2)=>{
                    if(!err2){
                        fs.close(fileDescriptor,(err3)=>{
                            if(!err3){
                                callback(false);
                            }else{
                                callback('Unable to truncate or closing file');
                            }
                        });
                    }
                 });
            }else{
                callback(err1);
            }
         });
        }else{
          callback(err);
        }
   });
}
// Delete existing file 
library.deleteData =(dir,fileName,callback)=>{
    fs.unlink(library.baseDir+dir+'/'+fileName+'.json',(err)=>{
        if(!err){
           callback(false);
        }else{
          callback(err);
        }
    })
}
module.exports = library;



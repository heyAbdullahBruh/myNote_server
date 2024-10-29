const multer=require('multer');
const path = require('path');


const Fstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/frndImg');
    },
    filename:(req,file,cb)=>{

        const fileExt=path.extname(file.originalname);
        const filename=file.originalname.replace(fileExt,"").toLowerCase() + Date.now() ;
        cb(null,filename+fileExt);  
        // console.log(file);  
    }
  });
  
  const uploadF=multer({
    storage:Fstorage,
    limits:{
        fileSize:100000000
    }
  });


  const Tstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/terrImg');
    },
    filename:(req,file,cb)=>{
        const fileExt=path.extname(file.originalname);
        const filename=file.originalname.replace(fileExt,"").toLowerCase().split(' ').join('-'+"-"+Date.now());
        cb(null,filename+fileExt);  
        // console.log(file);  
    }
  });
  
  const uploadT=multer({
    storage:Tstorage,
    limits:{
        fileSize:100000000
    }
  });
  

  module.exports ={uploadF,uploadT};
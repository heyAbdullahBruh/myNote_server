const multer=require('multer');
// const path = require('path');


const storage = multer.memoryStorage();
const uploadImg = multer({ storage: storage });
  

  module.exports =uploadImg;
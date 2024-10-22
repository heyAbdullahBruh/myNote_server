const mongoose= require('mongoose');

const messageSchema= new mongoose.Schema({
   name :{
    type:String,
    required:true
   },
   mail: {
    type:String,
    required:true
   },
   message:{
    type:String,
    required:true
   }
   
},{timestamps:true});

const Msg = mongoose.model('msgs',messageSchema);
module.exports= Msg;

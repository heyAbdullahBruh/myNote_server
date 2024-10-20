const mongoose= require('mongoose');

const planSchema= new mongoose.Schema({
   planTitle :{
    type:String,
    required:true,
   },
   planDesc: {
    type:String,
    required:true,
   },
   planStatus:{
    type:String,
    required:true,
    enum:{
        values:['pending','running','completed'],
        message:'{VALUE} is not a valid value'
    }
   }
   
},{timestamps:true});

const Plan = mongoose.model('plans',planSchema);
module.exports= Plan;

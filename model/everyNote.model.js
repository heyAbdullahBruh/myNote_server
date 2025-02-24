const mongoose= require('mongoose');

const enSchema= new mongoose.Schema({
   noteTitle :{
    type:String,
    required:true,
   },
   noteDesc: {
    type:String,
    required:true,
   },
   links:{
      type:Array
   },
   imgs:{
      type:Array
   }
},{timestamps:true});

const Notes = mongoose.model('notes',enSchema);
module.exports= Notes;

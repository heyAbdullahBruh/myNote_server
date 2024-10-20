const  mongoose = require('mongoose');



const frndSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String
    },
    call:{
        type:String
    },
    photos:{
        type:Array,
    },
    desc:{
        type:String,
        required:true
    }
},{timestamps:true});

const Frnd = mongoose.model('friends',frndSchema);

module.exports = Frnd;
const  mongoose = require('mongoose');



const terrSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Terror name is required']
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
        required:[true, 'Terror description is required']
    },
    terrType:{
        type:String,
        required:[true, 'Terror type is required'],
        enum:{
            values:['blue','yellow','orange','red'],
            message:'{VALUE} is not available'
        }
    }
},{timestamps:true});

const Terr = mongoose.model('terros',terrSchema);

module.exports = Terr;
const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:[true,'mail is require'],
        validate:{
            validator:(v)=>{
                return /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(v)
            },
            message:(prp)=>`${prp.value} is not a valid mail`
        },
        unique:[true,'Mail must have been unique']
    },
    username:{
        type:String,
        required:[true,'username is required'],
        validate:{
            validator:(v)=>{
                return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/.test(v)
            },
            message:prp=> `${prp.value} is not a valid username`
        },
        unique:[true,'username must have been unique']
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User = mongoose.model('user',userSchema);
module.exports= User;

const express= require('express');
const cors =require('cors');
const cookieParser =require('cookie-parser');
const userRoute = require('./routes/user.route');
const planRoute = require('./routes/plan.route');
const noteRoute = require('./routes/everyNote.route');

const app =express();

//Middleware funtion callling---->
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.get('/',(req,res)=>{
    try {
        return res.status(200).sendFile(__dirname + '/view/index.html');
        // res.clearCookie()
    } catch (error) {
        return res.status(500).json({success:false, messgae:`Something broke : ${error.messgae}`});
    };

});

// Another routes
// User ROute
app.use('/api/v1',userRoute);
// Plan ROute
app.use('/api/v1',planRoute);
// Note ROute
app.use('/api/v1',noteRoute);



// ROute not found error
app.use((req,res,next)=>{
    return res.status(404).json({success:false, messgae:`Route not found`});
});

// server error
app.use((req,res,next,err)=>{
    if (err) {
        return res.status(404).json({success:false, messgae:`Something broke : ${err.messgae}`});
    }else{
        next();
    }
});

 
module.exports =app;

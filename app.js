const express= require('express');
const cors =require('cors');
const cookieParser =require('cookie-parser');

// Import another route
const userRoute = require('./routes/user.route');
const planRoute = require('./routes/plan.route');
const noteRoute = require('./routes/everyNote.route');
const frndRoute = require('./routes/friend.route');
const terrRoute = require('./routes/terrTerg.route');
const msgRoute = require('./routes/message.route');

const app =express();
// const allowedOrigins = ['http://localhost:3000','https://abdullah-shayed.vercel.app'];

//Middleware funtion callling---->
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));


app.use(cors({
    origin: 'https://abdullah-shayed.vercel.app',
    credentials: true, // This is important, allows cookies to be sent with requests
}));


app.get('/',(req,res)=>{
    try {
        return res.status(200).sendFile(__dirname + '/view/index.html');
    } catch (error) {
        return res.status(500).json({success:false, messgae:`Something broke : ${error.messgae}`});
    };
//  res.clearCookie('kk',)
});

// Another routes
// User ROute
app.use('/api/v1',userRoute);
// Plan ROute
app.use('/api/v1',planRoute);
// Note ROute
app.use('/api/v1',noteRoute);
// Friend route
app.use('/api/v1',frndRoute);
// Terror route
app.use('/api/v1',terrRoute);
// message route
app.use('/api/v1',msgRoute)



// ROute not found error
app.use((req,res,next)=>{
    return res.status(404).json({success:false, messgae:`Route not found`});
});

// server error
app.use((req,res,next,err)=>{
    if (err) {
        return res.status(500).json({success:false, messgae:`Something broke : ${err.messgae}`});
    }else{
        next();
    }
});

 
module.exports =app;

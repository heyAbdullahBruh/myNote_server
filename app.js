const express= require('express');
const cors =require('cors');
const helmet = require('helmet');

// Import another route
const userRoute = require('./routes/user.route');
const planRoute = require('./routes/plan.route');
const noteRoute = require('./routes/everyNote.route');
const frndRoute = require('./routes/friend.route');
const terrRoute = require('./routes/terrTerg.route');

const app =express();

//Middleware funtion callling---->
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

  
    
app.use(cors());

app.get('/',(req,res)=>{
    try {
        return res.status(200).sendFile(__dirname + '/view/index.html');
    } catch (error) {
        return res.status(500).json({success:false, messgae:`Something broke : ${error.messgae}`});
    };

});

// Another routes
// // User ROute
app.use('/api/v1',userRoute);
// Plan ROute
app.use('/api/v1',planRoute);
// Note ROute
app.use('/api/v1',noteRoute);
// Friend route
app.use('/api/v1',frndRoute);
// Terror route
app.use('/api/v1',terrRoute);




// ROute not found error
app.use((req,res,next)=>{
    return res.status(404).json({success:false, messgae:`Route not found`});
});

// server error
    app.use((err, req, res, next) => {
        console.error(err.stack); // Log error stack for debugging
        return res.status(500).send('Something went wrong!');
    });

 
module.exports =app;

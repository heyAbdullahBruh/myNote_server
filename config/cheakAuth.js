const JWT = require('jsonwebtoken');

const cheakAuth = (req,res,next)=>{
    try {
        const token=req.headers.authorization;
        // console.log(token);
        JWT.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
            if(err) return res.status(400).json({message:'Authentication error'});
            const {username,userId}=decoded;
            req.username=username;
            req.userId=userId;
            next();
        });
    } catch (error) {
        next(error.message);
        res.clearCookie('token');
    };
};


module.exports=cheakAuth;
require('dotenv').config();
const bcrypt = require('bcrypt');
const JWT= require('jsonwebtoken');
const User = require('../model/user.model');
const saltRound=10;


// User add 
// const addUser =async(req,res)=>{
//   try {
//         const {name,username,mail,password}=req.body;
//         if (name && username && mail && password) {
//             const hashPass = await bcrypt.hash(password,saltRound);
//             const addUser = new User({
//                 name:name,
//                 mail:mail,
//                 username:username,
//                 password:hashPass
//             });
//             await addUser.save();
//             return res.status(201).json({success:true,message:'User Created'});
//         } else {
//            return res.status(400).json({success:false,message:`Please fill the form`});   
//         }
//   } catch (error) {
//      return res.status(500).json({success:false,message:`Something broke :${error.message}`});   
//   };
// };


// User login
const loginUser =async(req,res)=>{
    try {
          const {username,mail,password}=req.body;
          if ( username || mail && password) {
              const user  = await User.findOne({$or:[{username:username},{mail:mail}]});
              if (user) {
                   bcrypt.compare(password,user.password,(err,result)=>{
                        if(result===true){
                            const payload= {
                                username:username,
                                userId:user._id
                              };
                              const token =JWT.sign(payload,process.env.JWT_SECRET,{expiresIn:'10d'});
                              res.cookie('token', token, {
                                httpOnly: true,
                                secure: true,
                                sameSite:'lax',
                                maxAge:864000000
                              });
                             return res.status(200).json({
                                success:true,
                                message:'User Logged In Successfully',
                                username:user.username,
                                token:token
                             });
                        }else{
                            return res.status(400).json({success:false,message:'Authentication failed: incorect password'});
                        }
                   });
                  
              } else {
                return res.status(404).json({success:false,message:'Authentication failed: not found'});
              }
          } else {
             return res.status(400).json({success:false,message:`Please fill the form`});   
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`});   
    };
  };

const logoutUser =async(req,res)=>{
    try {
          await res.clearCookie('token',{
            httpOnly:true,
            secure:true,
            sameSite:'lax',
         });
          return res.status(200).json({success:true, message: 'LogOut successfully'});
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`});   
    };
};

const auth = (req,res)=>{
  try {
    const {token}=req.cookies;

    if(token){
      return res.status(200).json({
        auth:true
      });
    }else{
      return res.status(200).json({
        auth:false
      });
    }
  } catch (error) {
    return res.status(500).json({success:false,message:`Something broke :${error.message}`});   
  }
};

//   get User 
//   const getUser =async(req,res)=>{
//     try {
//           const user= await User.findOne({username:req.username});
//           if(user){
//             return res.status(200).json({success:true,user});   
//           }else{
//             return res.status(400).json({success:false,message:`User not found`});   
//           }
//     } catch (error) {
//        return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
//     };
// };

// const addUser =async(req,res)=>{
//     try {
          
//     } catch (error) {
//        return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
//     };
// };


module.exports= {loginUser,logoutUser,auth};
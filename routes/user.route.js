const cheakAuth = require('../config/cheakAuth');
const { loginUser, logoutUser, auth } = require('../controller/user.controll');

const router = require('express').Router();

// router.post('/user/add',addUser);
router.post('/user/logIn',loginUser);
router.post('/user/logOut',cheakAuth,logoutUser);
router.get('/user/auth',auth);
// router.get('/user',(req,res)=>{
//     res.clearCookie('token',{
//         http
//     })
// });


module.exports=router;
const cheakAuth = require('../config/cheakAuth');
const { loginUser, logoutUser } = require('../controller/user.controll');

const router = require('express').Router();

// router.post('/user/add',addUser);
router.post('/user/logIn',loginUser);
router.post('/user/logOut',cheakAuth,logoutUser);
// router.get('/user',cheakAuth,getUser);


module.exports=router;
const { addMsg, getMsg, singleMsg, deleteMsg } = require('../controller/message.control');
const cheakAuth = require('../config/cheakAuth.js');

const router =require('express').Router();

router.post('/message/add',addMsg);
router.get('/messages',cheakAuth,getMsg);
router.get('/message/detail/:mId',cheakAuth,singleMsg);
router.delete('/message/delete/:mId',cheakAuth,deleteMsg);

module.exports =router;
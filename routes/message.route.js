const { addMsg, getMsg, singleMsg, deleteMsg } = require('../controller/message.control');

const router =require('express').Router();

router.post('/message/add',addMsg);
router.get('/messages',getMsg);
router.get('/message/detail/:mId',singleMsg);
router.delete('/message/delete/:mId',deleteMsg);

module.exports =router;
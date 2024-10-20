const cheakAuth = require('../config/cheakAuth');
const { getFrnds, addFriend, updateFriend, getSingleFrnds, deletefrnds } = require('../controller/friend.controll');
const { uploadF } = require('../util/uploader');

const router= require('express').Router();



router.get('/frnds',cheakAuth,getFrnds);
router.get('/frnd/detail/:fId',cheakAuth,getSingleFrnds);
router.post('/frnd/add',cheakAuth,uploadF.array('fImgs',5),addFriend);
router.patch('/frnd/update/:fId',cheakAuth,uploadF.array('fImgs',5),updateFriend);
router.delete('/frnd/delete/:fId',cheakAuth,deletefrnds);



module.exports=router;
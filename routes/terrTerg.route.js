const cheakAuth = require('../config/cheakAuth');
const {  getTerrs, addTerr, updateTerr, getSingleTerr, deleteTerr } = require('../controller/terrTerg.controll');
// const { } = require('../controller/Terror.controll');
const { uploadT } = require('../util/uploader');

const router= require('express').Router();



router.get('/terrs',cheakAuth,getTerrs);
router.get('/terr/detail/:tId',cheakAuth,getSingleTerr);
router.post('/terr/add',cheakAuth,uploadT.array('tImgs',5),addTerr);
router.patch('/terr/update/:tId',cheakAuth,uploadT.array('tImgs',5),updateTerr);
router.delete('/terr/delete/:tId',cheakAuth,deleteTerr);



module.exports=router;
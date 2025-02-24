const router = require('express').Router();
const cheakAuth = require('../config/cheakAuth');
const { getNote, singleNote, updateNote, addNote,deleteNote } = require('../controller/everyNote.controll');
const uploadImg = require('../util/uploader');

router.get('/notes',cheakAuth, getNote);
router.get('/note/detail/:nId',cheakAuth, singleNote);
router.post('/note/add',cheakAuth,uploadImg.array('noteImg',5), addNote);
router.patch('/note/update/:nId',cheakAuth,uploadImg.array('noteImg',5), updateNote);
router.delete('/note/delete/:nId',cheakAuth, deleteNote);


module.exports = router;
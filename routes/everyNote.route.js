const router = require('express').Router();
const cheakAuth = require('../config/cheakAuth');
const { getNote, singleNote, updateNote, addNote,deleteNote } = require('../controller/everyNote.controll');

router.get('/notes',cheakAuth, getNote);
router.get('/note/detail/:nId',cheakAuth, singleNote);
router.post('/note/add',cheakAuth, addNote);
router.patch('/note/update/:nId',cheakAuth, updateNote);
router.delete('/note/delete/:nId',cheakAuth, deleteNote);


module.exports = router;
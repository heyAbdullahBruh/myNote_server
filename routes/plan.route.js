const router = require('express').Router();
const cheakAuth = require('../config/cheakAuth');
const { getPlan, getStatusPlan, singlePlan, addPlan, updatePlan, deletePlan } = require('../controller/plan.controll');

router.get('/plans/',cheakAuth,getPlan);
router.get('/plan/statusPlan/:pStatus',cheakAuth,getStatusPlan);
router.get('/plan/detail/:plId',cheakAuth,singlePlan);
router.post('/plan/add',cheakAuth,addPlan);
router.patch('/plan/update/:plId',cheakAuth,updatePlan);
router.delete('/plan/delete/:plId',cheakAuth,deletePlan);



module.exports = router;
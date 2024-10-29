const Plan = require("../model/plan.model");


const addPlan =async(req,res)=>{
    try {
          const {title,description,status}=req.body;
          if (title && description && status) {

            const planAdd = new Plan({
                planTitle:title,
                planDesc:description,
                planStatus:status
            });
            await planAdd.save();
            return res.status(201).json({success:true, message:'Plan add seccessfully',planAdd});

          } else {
            return res.status(400).json({success:false,message:'Please fill the form'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};


const getPlan =async(req,res)=>{
    try {
          const plans = await Plan.find();
          if(plans.length>0){
            return res.status(200).json({success:true,plans:plans.reverse()});
          } else {
            return res.status(404).json({success:false,message:'No have any your plans'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};

const singlePlan =async(req,res)=>{
    try {
        const {plId}=req.params;
          const plan = await Plan.findOne({_id:plId});
          if(plan){
            return res.status(200).json({success:true,plan});
          } else {
            return res.status(404).json({success:false,message:'Not found'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};

const getStatusPlan =async(req,res)=>{
    try {
        const {pStatus}=req.params;
          const plan = await Plan.find({planStatus:pStatus});
          if(plan.length>0){
            return res.status(200).json({success:true,plan});
          } else {
            return res.status(404).json({success:false,message:`Haven't any plans of ${pStatus} status`});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};


const updatePlan =async(req,res)=>{
    try {
        const {plId}=req.params;
        const {title,description,status}=req.body;
        const plan = await Plan.findOne({_id:plId});
        if(plan){
            const planUpdate = await Plan.findByIdAndUpdate(plId,{
                $set:{
                    planTitle:title,
                    planDesc:description,
                    planStatus:status
                }
              },{new:true,timestamps:true});
              if(planUpdate){
                return res.status(202).json({success:true,message:'Plan is Updated'});
              }
        }else {
            return res.status(404).json({success:false,message:'Not found'});
        }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};


const deletePlan =async(req,res)=>{
    try {
        const {plId}=req.params;
          const plan = await Plan.findOne({_id:plId});
          if(plan){
            const deletePlan =await Plan.findByIdAndDelete(plId);
            if(deletePlan){
                return res.status(202).json({success:true,message:'The plan has been deleted'});
            }
          } else {
            return res.status(404).json({success:false,message:'Not found'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};



module.exports ={ addPlan,getPlan,getStatusPlan,singlePlan,updatePlan,deletePlan};
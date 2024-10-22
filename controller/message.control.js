const Msg = require("../model/message.model");


const addMsg =async(req,res)=>{
    try {
          const {name,mail,message}=req.body;
          if (name && mail && message) {

            const msgAdd = new Msg({
                name:name,
                mail:mail,
                message:message
            });
            await msgAdd.save();
            return res.status(201).json({success:true, message:'Thanks for your message'});

          } else {
            return res.status(400).json({success:false,message:'Please fill the form'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};


const getMsg =async(req,res)=>{
    try {
          const msgs = await Msg.find();
          if(msgs.length>0){
            return res.status(200).json({success:true,msgs});
          } else {
            return res.status(404).json({success:false,message:'No have any your Messages'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};

const singleMsg =async(req,res)=>{
    try {
        const {mId}=req.params;
          const message = await Msg.findOne({_id:mId});
          if(messages){
            return res.status(200).json({success:true,message});
          } else {
            return res.status(404).json({success:false,message:'Not found'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};


const deleteMsg =async(req,res)=>{
    try {
        const {mId}=req.params;
          const message = await Msg.findOne({_id:mId});
          if(message){
            const deleteMsg =await Msg.findByIdAndDelete(mId);
            if(deleteMsg){
                return res.status(202).json({success:true,message:'The Msg has been deleted'});
            }
          } else {
            return res.status(404).json({success:false,message:'Not found'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};



module.exports ={ addMsg,getMsg,singleMsg,deleteMsg};
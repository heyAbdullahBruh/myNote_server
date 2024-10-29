const Frnd = require("../model/friend.model");
const cloudinary = require("../util/cloud");




// add a frined 
const addFriend =async(req,res)=>{
    try {
        const images= req.files;
        const imgUrls=[];
        const {name,mail,call,desc}=req.body;

        if (name && mail && desc && call) {
        //   console.log(call);
            for(const image of images){
              const result =  await cloudinary.uploader.upload(image.path,{
                resource_type:"auto"
              });
              imgUrls.push({
                photo:result.secure_url,
                imgId:result.public_id
              });
            };

            const createFrnd =new Frnd({
                name:name,
                call:call,
                mail:mail,
                desc:desc,
                photos:imgUrls
            }); 
            await createFrnd.save();
            return res.status(201).json({success:true,message:'New Friend Added',createFrnd}) 
        } else {
            return res.status(400).json({success:false,message:`Please fill the form`});  
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`}) ;  
    };
};


// get all friends
const getFrnds = async(req,res)=>{
  try {
      const frndAll= await Frnd.find();
      if (frndAll.length>0) {
          return res.status(200).json({success:true,frnd:frndAll.reverse()});
      } else {
          return res.status(404).json({success:false,message:'Not found '});
      }
  } catch (error) {
      return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
  };
};


const getSingleFrnds = async(req,res)=>{
    try {
        const {fId}=req.params;
        const user= await Frnd.findOne({_id:fId});
        if (user) {
            return res.status(200).json({success:false,frnd:user});
        } else {
            return res.status(404).json({success:false,message:'Not found '});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
  };


// update friend
const updateFriend =async(req,res)=>{
    try {
        const {name,mail,call,desc}=req.body;
        const {fId}=req.params;
        const images= req.files;
        const imgUrls=[];

            for(const image of images){
              const result =  await cloudinary.uploader.upload(image.path,{
                resource_type:"auto"
              });
              imgUrls.push({
                photo:result.secure_url,
                imgId:result.public_id
              });
            };
            const frnd = await Frnd.findOne({_id:fId});

            const updateF=await Frnd.findByIdAndUpdate(fId,{
                $set:{
                name:name,
                call:call,
                mail:mail,
                desc:desc,
                photos:imgUrls.length>0?imgUrls:frnd.photos
               }    
            },{new:true}); 

            if (updateF) {
                return res.status(201).json({success:true,message:'Friend data updated successfully'});  
            } else {
              return res.status(400).json({success:false,message:'Update error'});     
            }
        } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error}`}) ;  
    };
};


// Delete friend

const deletefrnds = async(req,res)=>{
    try {
        const {fId}=req.params;
        const user= await Frnd.findOne({_id:fId});
        if (user) {
            // return res.status(200).json(user);
            for(const img of user.photos){
                const result = await cloudinary.uploader.destroy(img.imgId);
                if(result.result ==='ok'){
                    const userDelete= await Frnd.findByIdAndDelete(fId);
                     if(userDelete){
                        return res.status(200).json({success:true,message :'friend deleted'});
                     }else{
                        return res.status(400).json({success:false,message :'friend is not deleted'});
                     }
                }else{
                    return res.status(400).json({success:false,message :'photo is not deleted'});
                }
            };

        } else {
            return res.status(404).json({success:false,message:'Not found friend'});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
  };








// const addFriend =async(req,res)=>{
//     try {
        
//     } catch (error) {
//         return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
//     };
// };


module.exports = {addFriend,getFrnds,updateFriend,getSingleFrnds,deletefrnds};
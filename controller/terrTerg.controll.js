const Terr = require("../model/terrTerg.model");
const cloudinary = require("../util/cloud");




// add a frined 
const addTerr =async(req,res)=>{
    try {
        const images= req.files;
        const imgUrls=[];
        const {name,mail,call,desc,terrType}=req.body;

        if (name && mail && desc && call&&terrType) {
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

            const createTerr =new Terr({
                name:name,
                call:call,
                mail:mail,
                desc:desc,
                photos:imgUrls,
                terrType:terrType
            }); 
            await createTerr.save();
            return res.status(201).json({success:true,createTerr}) 
        } else {
            return res.status(400).json({success:false,message:`Please fill the form`});  
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`}) ;  
    };
};


// get all Terrs
const getTerrs = async(req,res)=>{
  try {
      const TerrAll= await Terr.find();
      if (TerrAll.length>0) {
          return res.status(200).json(TerrAll);
      } else {
          return res.status(404).json({success:false,message:'Not found '});
      }
  } catch (error) {
      return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
  };
};


const getSingleTerr = async(req,res)=>{
    try {
        const {tId}=req.params;
        const user= await Terr.findOne({_id:tId});
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({success:false,message:'Not found '});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
  };


// update Terr
const updateTerr =async(req,res)=>{
    try {
        const {name,mail,call,desc,terrType}=req.body;
        const {tId}=req.params;
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

            const updateT=await Terr.findByIdAndUpdate(tId,{
                $set:{
                name:name,
                call:call,
                mail:mail,
                desc:desc,
                photos:imgUrls,
                terrType:terrType
               }    
            },{new:true}); 

            if (updateT) {
                return res.status(201).json({success:true,updateT});  
            } else {
              return res.status(400).json({success:false,message:'Update error'});     
            }
        } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error}`}) ;  
    };
};


// Delete Terr

const deleteTerr = async(req,res)=>{
    try {
        const {tId}=req.params;
        const user= await Terr.findOne({_id:tId});
        if (user) {
            // return res.status(200).json(user);
            for(const img of user.photos){
                const result = await cloudinary.uploader.destroy(img.imgId);
                if(result.result ==='ok'){
                    const userDelete= await Terr.findByIdAndDelete(tId);
                     if(userDelete){
                        return res.status(200).json({success:true,message :'Terror deleted'});
                     }else{
                        return res.status(400).json({success:false,message :'Terror is not deleted'});
                     }
                }else{
                    return res.status(400).json({success:false,message :'photo is not deleted'});
                }
            };

        } else {
            return res.status(404).json({success:false,message:'Not found Terror'});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
  };








// const addTerr =async(req,res)=>{
//     try {
        
//     } catch (error) {
//         return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
//     };
// };


module.exports = {addTerr,getTerrs,updateTerr,getSingleTerr,deleteTerr};
const Notes = require("../model/everyNote.model");


const addNote =async(req,res)=>{
    try {
          const {title,description}=req.body;
          if (title && description) {

            const noteAdd = new Notes({
                noteTitle:title,
                noteDesc:description,
            });
            await noteAdd.save();
            return res.status(201).json({success:true, message:'Note add seccessfully'});

          } else {
            return res.status(400).json({success:false,message:'Please fill the form'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};


const getNote =async(req,res)=>{
    try {
          const notes = await Notes.find();
          if(notes.length>0){
            return res.status(200).json({success:true,notes:notes.reverse()});
          } else {
            return res.status(404).json({success:false,message:'No have any your Notes'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};

const singleNote =async(req,res)=>{
    try {
        const {nId}=req.params;
          const note = await Notes.findOne({_id:nId});
          if(note){
            return res.status(200).json({success:true,note});
          } else {
            return res.status(404).json({success:false,message:' note Not found'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};


const updateNote =async(req,res)=>{
    try {
        const {nId}=req.params;
        const {title,description}=req.body;
        const note = await Notes.findOne({_id:nId});
        if(note){
            const noteUpdate = await Notes.findByIdAndUpdate(nId,{
                $set:{
                    noteTitle:title,
                    noteDesc:description,
                }
              },{new:true,timestamps:true});
              if(noteUpdate){
                return res.status(202).json({success:true,message:'Note has been updated'});
              }
        }else {
            return res.status(404).json({success:false,message:'note Not found'});
        }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};


const deleteNote =async(req,res)=>{
    try {
        const {nId}=req.params;
          const note = await Notes.findOne({_id:nId});
          if(note){
            const deleteNote =await Notes.findByIdAndDelete(nId);
            if(deleteNote){
                return res.status(202).json({success:true,message:'The Note has been deleted'});
            }
          } else {
            return res.status(404).json({success:false,message:'note Not found'});
          }
    } catch (error) {
       return res.status(500).json({success:false,message:`Something broke :${error.message}`})   
    };
};



module.exports ={ addNote,getNote,singleNote,updateNote,deleteNote};
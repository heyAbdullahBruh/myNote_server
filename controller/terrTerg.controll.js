const Terr = require("../model/terrTerg.model");
const imagekit = require("../util/cloud");

// Add a terror--->
const addTerr = async (req, res) => {
  try {
    const { name, mail, call, desc, terrType } = req.body;

    // ✅ Validate required fields
    if (!name || !mail || !desc || !call || !terrType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ✅ Validate phone number (only digits allowed)
    if (!/^\d+$/.test(call)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    const images = req.files || []; // Ensure it's an array

    let filteredImgUrls = [];

    if (images.length > 0) {
      // ✅ Upload images to ImageKit
      const imgUploadPromises = images.map(async (img) => {
        try {
          const result = await imagekit.upload({
            file: img.buffer, // Ensure buffer contains data
            fileName: img.originalname,
            folder: "/terrImages",
          });

          return { photo: result.url, id: result.fileId };
        } catch (uploadError) {
          return null;
        }
      });

      const imgUrls = await Promise.all(imgUploadPromises);
      filteredImgUrls = imgUrls.filter((img) => img !== null);

      if (filteredImgUrls.length === 0) {
        return res.status(500).json({
          success: false,
          message: "All image uploads failed. Terror was not added.",
        });
      }
    }

    // ✅ Save Terror Data in MongoDB
    const createTerr = new Terr({
      name,
      call,
      mail,
      desc,
      photos: filteredImgUrls || [], // Save uploaded image URLs
      terrType,
    });

    await createTerr.save();

    return res.status(201).json({
      success: true,
      message: "Terror has been added",
      terror: createTerr,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// ✅ Update Terror--->
const updateTerr = async (req, res) => {
  try {
    const { name, mail, call, desc, terrType } = req.body;
    const { tId } = req.params;

    if (!tId) {
      return res.status(400).json({
        success: false,
        message: "Terror ID is required",
      });
    }

    const terr = await Terr.findById(tId);
    if (!terr) {
      return res.status(404).json({
        success: false,
        message: "Terror not found",
      });
    }

    const images = req.files || [];
    let filteredImgUrls = terr.photos; // Keep existing photos if no new upload

    if (images.length > 0) {
      const imgUploadPromises = images.map(async (img) => {
        try {
          const result = await imagekit.upload({
            file: img.buffer,
            fileName: img.originalname,
            folder: "/terrImages",
          });

          return { photo: result.url, id: result.fileId };
        } catch (uploadError) {
          return null;
        }
      });

      const imgUrls = await Promise.all(imgUploadPromises);
      filteredImgUrls = imgUrls.filter((img) => img !== null);

      if (images.length > 0 && filteredImgUrls.length === 0) {
        return res.status(500).json({
          success: false,
          message: "All image uploads failed. Terror update aborted.",
        });
      }
    }

    // ✅ Update Terror Data in MongoDB
    const updateT = await Terr.findByIdAndUpdate(
      tId,
      {
        $set: {
          name,
          call,
          mail,
          desc,
          photos: filteredImgUrls,
          terrType,
        },
      },
      { new: true }
    );

    if (updateT) {
      return res.status(200).json({
        success: true,
        message: "Terror updated successfully",
        terror: updateT,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Update failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// get all Terrs--->
const getTerrs = async (req, res) => {
  try {
    const TerrAll = await Terr.find();
    if (TerrAll.length > 0) {
      return res.status(200).json({ success: true, terrs: TerrAll.reverse() });
    } else {
      return res.status(404).json({ success: false, message: "Not found " });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

// Get A Single Terror--->
const getSingleTerr = async (req, res) => {
  try {
    const { tId } = req.params;
    const user = await Terr.findOne({ _id: tId });
    if (user) {
      return res.status(200).json({ success: true, terr: user });
    } else {
      return res.status(404).json({ success: false, message: "Not found " });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

// Delete Terr
const deleteTerr = async (req, res) => {
  try {
    const { tId } = req.params;
    const user = await Terr.findOne({ _id: tId });
    if (user) {
      const fileIds = user.photos.map((img) => img.id);

      if (fileIds.length > 0) {
        await imagekit.bulkDeleteFiles(fileIds);
      }
      const userDelete = await Terr.findByIdAndDelete(tId);
      if (userDelete) {
        return res
          .status(200)
          .json({ success: true, message: "Terror deleted" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Terror is not deleted" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Not found Terror" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

// const addTerr =async(req,res)=>{
//     try {

//     } catch (error) {
//         return res.status(500).json({success:false,message:`Something broke :${error.message}`})
//     };
// };

module.exports = { addTerr, getTerrs, updateTerr, getSingleTerr, deleteTerr };

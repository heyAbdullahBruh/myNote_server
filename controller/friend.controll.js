const Frnd = require("../model/friend.model");
const imagekit = require("../util/cloud");

// add a frined
const addFriend = async (req, res) => {
  try {
    const { name, mail, call, desc } = req.body;

    // Validate required fields
    if (!name || !mail || !desc || !call) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (!/^\d+$/.test(call)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    const images = req.files || []; // Ensure it's an array to avoid errors

    // Upload images if they exist
    const imgUploadPromises = images.map(async (img) => {
      try {
        const result = await imagekit.upload({
          file: img.buffer,
          fileName: img.originalname,
          folder: "/frndImages",
        });
        return { photo: result.url, id: result.fileId };
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return null;
      }
    });

    const imgUrls = await Promise.all(imgUploadPromises);
    const filteredImgUrls = imgUrls.filter((img) => img !== null);

    if (images.length > 0 && filteredImgUrls.length === 0) {
      return res.status(500).json({
        success: false,
        message: "All image uploads failed. Friend was not added.",
      });
    }

    const createFrnd = new Frnd({
      name,
      call,
      mail,
      desc,
      photos: filteredImgUrls,
    });

    await createFrnd.save();

    return res.status(201).json({
      success: true,
      message: "New Friend Added",
      friend: createFrnd,
    });
  } catch (error) {
    console.error("Error adding friend:", error);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// update friend
const updateFriend = async (req, res) => {
  try {
    const { name, mail, call, desc } = req.body;
    const { fId } = req.params;
    const images = req.files || []; // Ensure it's an array to avoid errors

    // Upload images only if they exist
    const imgUrls = await Promise.all(
      images.map(async (img) => {
        try {
          const result = await imagekit.upload({
            file: img.buffer,
            fileName: img.originalname,
            folder: "/frndImages",
          });
          return {
            photo: result.url,
            id: result.fileId,
          };
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          return null;
        }
      })
    );
    const frnd = await Frnd.findOne({ _id: fId });

    const updateF = await Frnd.findByIdAndUpdate(
      fId,
      {
        $set: {
          name: name,
          call: call,
          mail: mail,
          desc: desc,
          photos: imgUrls.length > 0 ? imgUrls : frnd.photos,
        },
      },
      { new: true }
    );

    if (updateF) {
      return res
        .status(201)
        .json({ success: true, message: "Friend data updated successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Update error" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error}` });
  }
};

// get all friends
const getFrnds = async (req, res) => {
  try {
    const frndAll = await Frnd.find();
    if (frndAll.length > 0) {
      return res.status(200).json({ success: true, frnd: frndAll.reverse() });
    } else {
      return res.status(404).json({ success: false, message: "Not found " });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

const getSingleFrnds = async (req, res) => {
  try {
    const { fId } = req.params;
    const user = await Frnd.findOne({ _id: fId });
    if (user) {
      return res.status(200).json({ success: false, frnd: user });
    } else {
      return res.status(404).json({ success: false, message: "Not found " });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

// Delete friend

const deletefrnds = async (req, res) => {
  try {
    const { fId } = req.params;
    const user = await Frnd.findOne({ _id: fId });
    if (user) {
      const fileIds = user.photos.map((img) => img.id);

      if (fileIds.length > 0) {
        await imagekit.bulkDeleteFiles(fileIds);
      }
      const userDelete = await Frnd.findByIdAndDelete(fId);
      if (userDelete) {
        return res
          .status(200)
          .json({ success: true, message: "friend deleted" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "friend is not deleted" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Not found friend" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

// const addFriend =async(req,res)=>{
//     try {

//     } catch (error) {
//         return res.status(500).json({success:false,message:`Something broke :${error.message}`})
//     };
// };

module.exports = {
  addFriend,
  getFrnds,
  updateFriend,
  getSingleFrnds,
  deletefrnds,
};

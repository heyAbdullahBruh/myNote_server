const Notes = require("../model/everyNote.model");
const imagekit = require("../util/cloud");

// Post A note-->
const addNote = async (req, res) => {
  try {
    const { title, description, links } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Please fill the form" });
    }

    const images = req.files || []; // Ensure it's an array to avoid errors

    // Upload images only if they exist
    const imgUrls = await Promise.all(
      images.map(async (img) => {
        try {
          const result = await imagekit.upload({
            file: img.buffer,
            fileName: img.originalname, 
            folder: "/noteImages",
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

    // Filter out any failed uploads
    const filteredImgUrls = imgUrls.filter(img => img !== null);

    const noteAdd = new Notes({
      noteTitle: title,
      noteDesc: description,
      links,
      imgs: filteredImgUrls,
    });

    await noteAdd.save();

    return res.status(201).json({ success: true, message: "Note added successfully", note: noteAdd });

  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({ success: false, message: `Something broke: ${error.message}` });
  }
};


// Update note --->
const updateNote = async (req, res) => {
  try {
    const { nId } = req.params;
    const { title, description, links } = req.body;
    const note = await Notes.findOne({ _id: nId });
    if (note) {
      const images = req.files;

      const imgUrls = await Promise.all(
        images.map(async (img) => {
          const result = await imagekit.upload({
            file: img.buffer,
            fileName: file.originalname,
            folder: "/noteImages",
          });
          return {
            photo: result.url,
            id: result.fileId,
          };
        })
      );

      const noteUpdate = await Notes.findByIdAndUpdate(
        nId,
        {
          $set: {
            noteTitle: title,
            noteDesc: description,
            links: links ? links : note.links,
            imgs: imgUrls.length > 0 ? imgUrls : note.imgs,
          },
        },
        { new: true, timestamps: true }
      );
      if (noteUpdate) {
        return res
          .status(200)
          .json({ success: true, message: "Note has been updated" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "note Not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

const getNote = async (req, res) => {
  try {
    const notes = await Notes.find();
    if (notes.length > 0) {
      return res.status(200).json({ success: true, notes: notes.reverse() });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No have any your Notes" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

const singleNote = async (req, res) => {
  try {
    const { nId } = req.params;
    const note = await Notes.findOne({ _id: nId });
    if (note) {
      return res.status(200).json({ success: true, note });
    } else {
      return res
        .status(404)
        .json({ success: false, message: " note Not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { nId } = req.params;
    const note = await Notes.findOne({ _id: nId });
    if (note) {
      const fileIds = note.imgs.map(img => img.id);

      if (fileIds.length > 0) {
        await imagekit.bulkDeleteFiles(fileIds);
      };
  
      const deleteNote = await Notes.findByIdAndDelete(nId);

      if (deleteNote) {
        return res
          .status(202)
          .json({ success: true, message: "The Note has been deleted" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "note Not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Something broke :${error.message}` });
  }
};

module.exports = { addNote, getNote, singleNote, updateNote, deleteNote };

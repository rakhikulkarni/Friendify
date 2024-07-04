const express = require("express");
const router = express.Router();

const Follow = require("../models/follow");

// Create
const createFollow = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const followed_id = req.body.idToFollow;
    const newFollow = new Follow({
      follower_id: userId,
      followed_id,
    });
    await newFollow.save();
    res.status(200).json({status:true,"message":"Successfully followed"});
  } catch (error) {
    console.error("Error creating follow:", error);
    throw error;
  }
};

// Read
const getFollowers = async (req,res) => {
  try {
    const follows = await Follow.find({followed_id:req.params.user_id});
    res.status(200).json({status:true, data:follows});
  } catch (error) {
    console.error("Error getting follows:", error);
    throw error;
  }
};

// Update
const updateFollow = async (req, res) => {
  try {
    await Follow.findOneAndUpdate({follower_id:req.params.user_id}, {
        follower_id:req.params.user_id,
        followed_id:req.body.idToFollow

    }, {
      new: true,
    });
    res.status(200).json({status:true,})
  } catch (error) {
    console.error("Error updating follow:", error);
    throw error;
  }
};

// Delete
const deleteFollow = async (req, res) => {
  try {
    await Follow.findOneAndDelete({follower_id:req.params.user_id});
    
    res.status(200).json({status:true ,message:"deleted successfully"})
  } catch (error) {
    console.error("Error deleting follow:", error);
    throw error;
  }
};

router.post("/add-follower/:user_id", createFollow);
router.get("/get-follower/:user_id", getFollowers);
router.put("/update-follower/:user_id", updateFollow);
router.delete("/delete-follower/:user_id", deleteFollow);

module.exports = router;
const mongoose = require("mongoose");
const users = require("./user");

const postSchema = new mongoose.Schema({
  postcontent: String,
  likes: Number,
  userId: String,
  title: String,
  keywords: String
})

const Post =  mongoose.model("Post",postSchema);
async function newPost(data) {
  console.log('data: ', data);


  const newdoc = await Post.create({
    postcontent: data.postcontent, userId: data.userId, title: data.title, keywords: data.keywords
  });

  return newdoc;
}



// UPDATE
async function updatePost(id, postcontent) {
  const post = await Post.findByIdAndUpdate(id,postcontent);
  return post;
}

//DELETE
async function deletePost(id) {
  await Post.findByIdAndDelete(id);
};

// utility functions
async function getPost(id) {
  return await Post.findById(id);
}
// utility functions
async function getPosts() {
  return await Post.find();
}

// 5. export all functions we want to access in route files
module.exports = {
  newPost, getPost, updatePost, deletePost,getPosts
};
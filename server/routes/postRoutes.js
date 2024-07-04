const express = require("express");
const Post = require('../models/post'); //accesses functions in user model file
const router = express.Router();

// 2. create all routes to access database
router
.get('/', async (_req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.send(posts);
  } catch(err) {
    res.status(401).send({message: err.message});
  }
})
  .get('/get-posts', async (req, res) => {
    try {
        const post = await Post.getPosts();
        res.status(200).json(post);
      } catch(error) {
        res.status(401).send({ message: error.message });
      }
  })
  .get('/get-post/:post_id', async (req, res) => {
    try {
      const{post_id} = req.params;
        const post = await Post.getPost(post_id);
        res.status(200).json(post);
      } catch(error) {
        res.status(401).send({ message: error.message });
      }
  })

  .post('/create', async (req, res) => {
    try {
      const post = await Post.newPost(req.body);
      res.status(201).send(post); // Use 201 for resource created
    } catch (error) {
      res.status(400).send({ message: error.message }); // Use 400 for bad request
    }
  })
  
  .put('/update/:post_id', async (req, res) => {
    try {
      const{post_id} = req.params;
      const post = await Post.updatePost(post_id,req.body);
      res.status(200).json({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })
  .put('/edit', async (req, res) => {
    try {
      let note = await Post.editNotes(req.body);
      res.send({...this.post, postcontent});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  
  .delete('/delete/:post_id', async (req, res) => {
    try {
      const{post_id} = req.params;

      await Post.deletePost(post_id);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;
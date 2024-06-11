const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : { type: String, unique:true ,required: true},
    password : { type: String, required: true},
    followers :[String],
    following : [String]
})

const User = mongoose.model("User",userSchema);

//Create CRUD functions

//Create a User
async function register(username,email, password) {
    const user =  await getUser(username);
    if(user) throw Error('Username already in use');
  
    const newUser = await User.create({
      username: username,
      email:email,
      password: password
    });
  
    return newUser;
  }

//UPDATE
  async function updatePassword(id, password) {
    const user = await User.updateOne({"_id": id}, {$set: { password: password}});
    return user;
  }

//READ User
async function login(username, password) {
    const user = getUser(username)
    if(!user) throw Error('User not found');

    if(user.password !=password) throw Error('Wrong Password');
    return user;
  }

//DELETE
async function deleteUser(id) {
    await User.deleteOne({"_id": id});
 };


  async function getUser(username) {
    return await User.findOne({ "username": username});
  }

  module.exports = { 
    register, login, updatePassword, deleteUser 
  };
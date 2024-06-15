require("dotenv").config();
const { error } = require("console");
const express = require('express')
const app = express()
const mongoose = require("mongoose");
const path = require('path')

const userRoutes = require('./server/routes/user');
const postRoutes = require('./server/routes/post');

mongoose.connect(process.env.dbURL)
  .then(() => console.log('DB Connected!!'))
  .catch(err => console.error('Connection error:', err));

app.use(express.json()); // parse JSON bodies

app.use(express.static(__dirname + "/public"))
app.get('/', (req,res) => res.sendFile(path.join(__dirname,'/public','index.html')))

//route to at least one other entity that is NOT user/customer/etc.

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

router.use("/user", require("./userRoutes"));
router.use("/post", require("./postRoutes"));
router.use("/follow", require("./followRoutes"));

module.exports = router;

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!!!`))
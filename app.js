const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const multer=require('multer');
const path=require('path');

app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
require("./models/model");
require("./models/post");



app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));


const {uri}=require('./keys');

<<<<<<< HEAD
// const URI="mongodb+srv://db_user2:yiRAVQEy0ahe6aaM@cluster0.mnpichp.mongodb.net/?retryWrites=true&w=majority";
// const old_uri="mongodb://db_user2:yiRAVQEy0ahe6aaM@ac-56elmpt-shard-00-00.mnpichp.mongodb.net:27017,ac-56elmpt-shard-00-01.mnpichp.mongodb.net:27017,ac-56elmpt-shard-00-02.mnpichp.mongodb.net:27017/?ssl=true&replicaSet=atlas-22fjhs-shard-0&authSource=admin&retryWrites=true&w=majority";

=======
>>>>>>> b23a73736a0bec02386f330223803d7a736dbfdd

mongoose.set("strictQuery", false);


mongoose.connect(uri);
<<<<<<< HEAD
=======

>>>>>>> b23a73736a0bec02386f330223803d7a736dbfdd
mongoose.connection.on('connected',()=>{
    app.listen(port, () => {
        console.log("Server is connected to DB and running on port " + port);
      });    
});
mongoose.connection.on('error',(err)=>{
    console.log(err.message);
});

app.use(express.static(path.join(__dirname,'./frontend/build')));

app.get('*',(req,res)=>{
    res.sendFile(
        path.join(__dirname,'./frontend/build/index.html'),
        function(err){
            res.status(500).send(err);
        }
    )
})

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


mongoose.set("strictQuery", false);


mongoose.connect(uri);

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

const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;

const userSchema=new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    Photo : {
        type : String,
    },
    followers : [
        {
        type : ObjectId,
        ref : "USER"
        }
    ],
    following : [
        {
            type : ObjectId,
            ref : "USER"
        }
    ],
    Photo : {
        type : String
    }
});

mongoose.model('USER',userSchema);
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST=mongoose.model("POST");


router.get('/allposts',requireLogin,(req,res)=>{
     POST.find()
      .populate("postedBy","_id name Photo")
      .populate("comments.postedBy","_id name")
      .sort("-createdAt")
     .then((posts)=>{
       res.json({posts});
     }).catch((err)=>{
      console.log(err);
     })
})



router.post("/createpost", requireLogin, (req, res) => {
  const { photo, body } = req.body;
  if (!photo || !body) {
    return res.status(422).json({
      err: "Please add all the fields :(",
    });
  }
  // console.log(req.user);
  const post = new POST({
    photo,
    body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({
        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/myposts", requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy","_id name") 
      .sort("-createdAt")
      .then(myposts => {
          res.json(myposts)
      })
})



router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    })
    .populate("postedBy", "_id name Photo")
    .exec((err, result) => {
            if (err) {
                return res.status(422).json({ err: err })
            } else {
                res.json(result)
            }
        })
})
// exec callback func is used when update is done
// new:true is used to get updated data


router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
    .exec((err, result) => {
            if (err) {
                return res.status(422).json({ err: err })
            } else {
                res.json(result)
            }
        })
})


router.put('/commnet',requireLogin,(req,res)=>{
  const comment={
    comment : req.body.text,
    postedBy : req.user._id
  }

  POST.findByIdAndUpdate(req.body.postId,{
    $push: { comments : comment }
    }, {
        new: true
    }).populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err, result) => {
            if (err) {
                return res.status(422).json({ err: err })
            } else {
                res.json(result)
            }
        })
  })


  router.delete('/deletePost/:postId',requireLogin,(req,res)=>{
       POST.findOne({_id : req.params.postId})
       .populate("postedBy","_id")
       .exec((err,result)=>{
        if(err || !result)
        {
          return res.status(422).json({
            err : err
          })
        }
         if(result.postedBy._id.toString() == req.user._id.toString())
         {
             result.remove()
            .then((resp=>{
              res.json({
                msg : "Post Successfully deleted"
              })
            }))
            .catch((err)=>{
              console.log(err);
            })         
          }
       })
  })

  router.get("/myfollwingpost", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})

module.exports = router;


// king@bhai.com
// Kingbhai@1
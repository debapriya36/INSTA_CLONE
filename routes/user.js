const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requireLogin  = require("../middleware/requireLogin");


router.get("/user/:id", requireLogin, (req, res) => {
  const userId = req.params.id;
  USER.findOne({ _id: userId })
    .select("-password")
    .then((user) => {
      POST.find({ postedBy: userId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.status(200).json({ user, post });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

router.put("/follow", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(req.body.followId, {
      $push: { followers: req.user._id }
  }, {
      new: true
  }, (err, result) => {
      if (err) {
          return res.status(422).json({ error: err })
      }
      USER.findByIdAndUpdate(req.user._id, {
          $push: { following: req.body.followId }
      }, {
          new: true
      }).then(result => {
          res.json(result)

      })
          .catch(err => { return res.status(422).json({ error: err }) })
  }
  )
})

router.put("/unfollow", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(req.body.followId, {
      $pull: { followers: req.user._id }
  }, {
      new: true
  }, (err, result) => {
      if (err) {
          return res.status(422).json({ error: err })
      }
      USER.findByIdAndUpdate(req.user._id, {
          $pull: { following: req.body.followId }
      }, {
          new: true
      }).then(result => {
          res.json(result)

      })
          .catch(err => { return res.status(422).json({ error: err }) })
  }
  )
})

router.put("/uploadprofilepic", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { Photo: req.body.pic }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: er })
        } else {
            res.json(result)
        }
    })
})


module.exports = router;

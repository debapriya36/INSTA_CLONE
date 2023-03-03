import React from "react";
import "./Profile.css";
import { useState, useEffect } from "react";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userid } = useParams();

  const [user, setUser] = useState("");
  const [post, setPost] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  var picLink = "https://cdn.iconscout.com/icon/free/png-256/profile-2377591-1982938.png?f=avif&w=128";

  // const changeprofile = () => {
  //   if (changePic) {
  //     setChangePic(false)
  //   } else {
  //     setChangePic(true)
  //   }
  // }

  useEffect(() => {
    const url = "/user/" + userid;
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result.user);
        setPost(result.post);
        if (result.user.followers.includes(JSON.parse(localStorage.getItem("user")))) {
          setIsFollow(true)
        }
      });
  }, [isFollow]);



  const followUser = (userId) => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsFollow(true);
      });
  }

  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsFollow(false);
      })
  }

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
          src={user.Photo ? user.Photo : picLink}
           // src="https://plus.unsplash.com/premium_photo-1671117132344-653525772e51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div className="profile-data">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <h1>
              {user.name}
            </h1>
            <button className="followBtn"
              onClick={() => {
                if (isFollow === true)
                  unfollowUser(user._id)
                else
                  followUser(user._id)
              }
              }
            >
              {isFollow === true ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{post.length} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />

      {/* gallery  */}

      <div className="gallery">
        {post.map((pics) => {
          return (
            <>
              <img
                key={pics._id}
                src={pics.photo}
                alt={pics.body}
                className="item"
              //   onClick={()=>toggleDetails(pics)}
              />
            </>
          );
        })}
      </div>
      {/* {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      } */}
    </div>
  );
};

export default UserProfile;

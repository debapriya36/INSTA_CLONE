import React from 'react'
import './PostDetail.css';
//import { useNavigate } from 'react-router-dom';

const PostDetail = ({item , toggleDetails}) => {

 // const navigate = useNavigate();

 var picLink = "https://cdn.iconscout.com/icon/free/png-256/profile-2377591-1982938.png?f=avif&w=128";

const deletemyPost=(id)=>{
  const url="/deletepost/"+id;
   fetch(url,{
    method : "delete",
    headers : {
      "Authorization" : "Bearer "+localStorage.getItem("jwt")
    }
   }).then((res)=>res.json())
   .then((result)=>{
     toggleDetails();
   //  navigate('/profile');
     window.location.reload();
     console.log(result)
   })
   .catch((err)=>console.log(err))
}



  return (
    <div className="showComment">
            <div className="container">
              <div className="postPic">
                <img src={item.photo} alt="" />
              </div>
              <div className="details">
                {/* card header */}
                <div
                  className="card-header"
                  style={{ borderBottom: "1px solid #00000029" }}
                >
                  <div className="card-pic">
                    <img
                      src={item.postedBy.pic ? item.postedBy.pic : picLink}
                      alt=""
                    />
                  </div>
                  <h5>{item.postedBy.name}</h5>
                  <div className="deletePost">
                  <span className="material-symbols-outlined"
                   onClick={()=>{
                     console.log("delete")
                     deletemyPost(item._id);
                   }}
                  >
                     delete
                 </span>
                  </div>
                </div>
  
                {/* commentSection */}
                <div
                  className="comment-section"
                  style={{ borderBottom: "1px solid #00000029" }}
                >
                  {item.comments.map((comment) => {
                    return (
                      <p className="comm">
                        <span
                          className="commenter"
                          style={{ fontWeight: "bolder" }}
                        >
                          {comment.postedBy.name}{" "}
                        </span>
                        <span className="commentText">{comment.comment}</span>
                      </p>
                    );
                  })}
                </div>
  
                {/* card content */}
                <div className="card-content">
                  <p>{item.likes.length} Likes</p>
                  <p>{item.body}</p>
                </div>
  
                {/* add Comment */}
                <div className="add-comment">
                  <span className="material-symbols-outlined">mood</span>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    // value={comment}
                    // onChange={(e) => {
                    //   setComment(e.target.value);
                    // }}
                  />
                  <button
                    className="comment"
                    // onClick={() => {
                    //   makeComment(comment, item._id);
                    //   toggleComment();
                    // }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
            <div
              className="close-comment"
              onClick={() => {
                toggleDetails();
              
              }}
            >
              <span className="material-symbols-outlined material-symbols-outlined-comment">
                close
              </span>
            </div>
          </div>
  )
}

export default PostDetail

import React, { useEffect } from 'react'
import './CreatePost.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const CreatePost = () => {
  const [body,setBody]=useState("");
   const [url, setUrl] = useState("")
  const [image,setImage]=useState("");
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const navigate = useNavigate();
  useEffect(() => {

    // saving post to mongodb
    if (url) {
      console.log(url);
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          photo: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.err) {
            notifyA(data.err)
          } else {
            notifyB("Successfully Posted")
            navigate("/")
          }
        })
        .catch(err => console.log(err))
    }

  }, [url])


  // posting image to cloudinary
  const postDetails = () => {

     if(!body || !image){
       return  notifyA("Pleas add all the fields");
     }

    console.log(body, image)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "instagram-clone")
    data.append("cloud_name", "vancitydc19")
    fetch("https://api.cloudinary.com/v1_1/vancitydc19/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))
    console.log(url)

  }

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); 
    };
  };




  return (
    <div className='createPost'>
        <div className="post-header">
           <h4
           style={{ margin: "3px auto" }}>
                Create Post
           </h4>
           <button id='post-btn' 
           onClick={()=>{
            postDetails()
           }}
           >Share</button>
        </div>
        <div className="main-div">
        <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" alt="" id="output"/>
          <input type="file"
            accept='image/*'
            onChange={(event) => {
              loadfile(event);
               setImage(event.target.files[0]);
          }}
            
          />
        </div>
        <div className="details">
          <div className="card-header">
            <div className="card-pic">
              <img src="" alt="" />
            </div>
            <h5>
             {JSON.parse(localStorage.getItem("user")).name}
            </h5>
          </div>
          <textarea  type="text" 
            placeholder="Write a caption..."
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
        </div>
    </div>
  )
}

export default CreatePost

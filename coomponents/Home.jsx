import React,{useState,useEffect} from 'react';
import {memo} from "react";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
// import axios from "axios";
import Api from "./Api";

function Home() {

  const [blog,setBlog] = useState()
  // const [topblog, setTopblog] = useState();

  useEffect(()=>{
    Api.get("/get-blog").then((res)=>{
      console.log(res)
      setBlog(res.data)

    }).catch((err)=>{
      console.log(err)
    })
  },[]);

// console.log("i am home page")
  

  return (
    <div className='home'>
      <Helmet>
        <title>Home - K's Media</title>
      </Helmet>
      <div className='createFil'>
        <div className='createBtn'>
      <Link to="/create-blog">
          Create
      </Link>  
        </div>
       
      </div>
      <h2>Blogs</h2>

      <div className='blogs'>
      {
 blog?.length && blog?.map((blog, index)=>{
 return (<div className='blog' key={index}>
  <div className='blogUserData'>
    <p className='userId'>{blog?.userId}</p>
    <p className='timePosted'>Posted at: 17-01-2024</p>
  </div>
<div className='blogImg'>
  <img src={`http://localhost:5000/images/${blog?.images}`}  alt='blogImage'/>
</div>
<div className='blogContent'>
  <h2 className='title'>{blog?.thought}</h2>
<Link to={`/blog/${blog?._id}`}>Read more</Link>
</div>
</div>)
})
}
      </div>
    </div>
  )
}

export default memo(Home)

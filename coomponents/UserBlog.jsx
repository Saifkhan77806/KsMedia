import React,{useState, useEffect} from 'react'
import {Link} from "react-router-dom";

import Api from "./Api"
import {useAuth} from "../store/auth";

function UserBlog() {
  
const [blog, setBlog] = useState()
const { user, userEmail } = useAuth();

useEffect(()=>{
  Api.get("/get-blog").then((res)=>{
    setBlog(res.data)
  }).catch((err)=>{
    console.log(err)
  })
},[])


  return (
    <>
    <div className='userBlog'>
      <div className='profile'>

      <div className='profileContainer'>
        {/* {user.charAt(0).toUpperCase()} */}
      </div>
      
      <div className='proflieUserId'>{user}</div>
        <div className='proflieEmail'>{userEmail}</div>
        </div>

        {
           blog?.map((blog, index) =>{
               return ( user === blog.userId && <div className='blog' key={index}>
               <div className='blogUserData'>
                 <p className='userId'>{blog?.userId}</p>
                 <p className='timePosted'>Posted at: 17-01-2024</p>
               </div>
             <div className='blogImg'>
               <img src={`/images/${blog?.images}`}  alt='blogImage'/>
             </div>
             <div className='blogContent'>
               <h2 className='title'>{blog?.title}</h2>
             <Link to={`/blog/${blog?._id}`}>Read more</Link>
             </div>
             </div>)
            
           })
        }

    
    </div>
    </>
  )

}

export default UserBlog

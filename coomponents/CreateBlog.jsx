import React,{useState} from 'react'
import {useAuth} from "../store/auth"
import Api from "./Api"
import {Helmet} from "react-helmet";


function CreateBlog() {

    const { user } = useAuth();

    const [blog,setBlog] = useState({
      userId: user,
      title: "",
      thought:"",
      images:""
  })


    const inputs = (e) =>{
        setBlog({...blog,[e.target.name]: e.target.value})
    }

    const files = (e) =>{

        setBlog({...blog,[e.target.name]: e.target.files[0]})
        console.log(blog.images)
    }

    const submits = async(e) =>{
        e.preventDefault();
        const data = new FormData();
        data.append('userId', blog.userId)
        data.append("title", blog.title)
        data.append('thought', blog.thought)
        data.append('images', blog.images)
       await Api.post("/upload-blog", data).then((res)=>{
            // console.log(res)
            setBlog({...blog, images: res.data.images});
            alert("data added successfully")
        }).catch((err)=>{
            console.log(err)
        })
        
    }

  return (
    <div className='createBlog'>
      <Helmet>
    <title>Create blog -- Home - K's Media</title>
      <meta name="description" content='search your thought related to your situation' />
    </Helmet>
      <h1>Create blog</h1>
      <form onSubmit={submits}>
        <input type="text" name='userId' placeholder='Enter user id here' value={blog.userId} onChange={inputs} />
        <input type="text" name='thought' value={blog.thought} onChange={inputs} placeholder='Enter your thought here' />
        <textarea placeholder="Thought here ..." rows="10" name="title" value={blog.title} onChange={inputs}></textarea>
        <input type="file" name='images'  onChange={files} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default CreateBlog

import React,{useState, useEffect} from 'react';
import { useAuth } from "../store/auth";
import { useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import {Link} from "react-router-dom";
import Api from "./Api";
import {Helmet} from "react-helmet";






function Secret() {
  
  const [blog,setBlog] = useState()
  const {user, isLogged} = useAuth();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(true)
  const [fliterdata, setFilterdata] = useState();
  const [search, setSearch] = useState("");
  
  useEffect(()=>{
    if(!isLogged ){
      navigate("/");
    }

    Api.get("/get-blog").then((res)=>{
      // console.log(res)
      setBlog(res.data)

    }).catch((err)=>{
      console.log(err)
    })
   
    console.log(`user data generated :- ${user}`);
  }, [isLogged, user, navigate]);
  
 if(user && isUser){
      setIsUser(false)
    }

    const inputs = (e) =>{
      const input = e.target.value;

      if(input !== ""){
        const data = blog.filter((blog)=>{
          return blog?.title.toLowerCase().includes(input.toLowerCase());
        })

        setFilterdata(data);
      }else{
        setFilterdata(blog);
      }

      setSearch(input);

    }
  

  return (
    <>
    <Helmet>
    <title>Search -- Home - K's Media</title>

      <meta name="description" content='search your thought related to your situation' />
    </Helmet>
    <div className='search'>
      <div className='inputContainer'>
        <input type="text" placeholder='serch blog here... by title' value={search} onChange={inputs} /><CiSearch className='searchIcon' />
        </div>
      </div>
    <div className='blogs'>
      {
fliterdata?.map((blog, index)=>{
 return (<div className='blog' key={index}>
  <div className='blogUserData'>
    <p className='userId'>{blog?.userId}</p>
    <p className='timePosted'>Posted at: 17-01-2024</p>
  </div>
<div className='blogImg'>
  <img src={`/images/${blog?.images}`}  alt='blogImage'/>
</div>
<div className='blogContent'>
  <h2 className='title'>{blog?.thought}</h2>
<Link to={`/blog/${blog?._id}`}>Read more</Link>
</div>
</div>)
})
}
      </div>
    </>
  )
}

export default Secret;

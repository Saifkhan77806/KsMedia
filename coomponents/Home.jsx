import React,{useState,useEffect} from 'react';
import {memo} from "react";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
// import axios from "axios";
import Api from "./Api";
import Card from "./Card"

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
    <div className='home mt-5'>
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

<div className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 p-3">
        <Card />
        <Card />
        <Card />
        <Card />

</div>

    </div>
  )
}

export default memo(Home)

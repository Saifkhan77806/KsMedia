import React, { useEffect, useState } from 'react'
import Api from "./Api";
import ImgDialog from './imgDialog';

function Card() {
  const [blog, setBlog] = useState();
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  console.log(open)
 
  const handleOpen = () => setOpen((cur) => !cur);
  useEffect(()=>{
    Api.get("/get-blog").then((res)=>{
      console.log(res)
      setBlog(res.data)

    }).catch((err)=>{
      console.log(err)
    })
  },[]);
  return (
  <>
  {
    open ? (
      <ImgDialog isOpen={open} imgUrl="http://localhost:5000/images/images_1723258032911.jfif" />
    ) : (
      <>
      <div className="container bg-slate-600 shadow-xl p-3 rounded-md relative mt-3 mb-3">
      <div className="images w-[50%] relative left-[25%] top-[-15%] hover:w-[52%] transition-all"  onClick={handleOpen}>
          <img
            alt="nature"
            className="h-full w-full object-cover object-center"
            src="http://localhost:5000/images/images_1723258032911.jfif"
          />
      </div>
      <div className="tittle">
        <h1>Title</h1>
      </div>
      <div className="metaData">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, similique?
      </div>
      <button>Read More !</button>
    </div>
      </>
    )
  }
 
  </>
  )
}

export default Card
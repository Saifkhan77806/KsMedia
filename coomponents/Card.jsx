import React, { useEffect, useState, useMemo } from 'react'
import Api from "./Api";
import ImgDialog from './ImgDialog.jsx';
import { useAuth } from '../store/auth';

function Card() {
  const [blog, setBlog] = useState();
  // const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const {opened, open} = useAuth();


console.log(open)

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
      <div className="container bg-slate-600 shadow-xl p-3 rounded-md relative mt-3 mb-3">
      <div className="images w-[50%] h-[25%] mt-5 relative left-[25%] top-[-15%] hover:w-[52%] transition-all"  onClick={opened}>
          <img
            alt="nature"
            className="h-full w-full object-cover object-center"
            src="http://localhost:5000/images/images_1723863924546.jfif"
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
  {
   open && <ImgDialog isOpen={open} imgUrl="http://localhost:5000/images/images_1723863924546.jfif" />
 }
  </>
  )
}

export default Card
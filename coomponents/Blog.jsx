import React,{useState, useLayoutEffect} from 'react'
import { useParams, useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {useAuth} from "../store/auth";
import Api from "./Api"
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';

function Blog() {

 const {id} = useParams();
 const navigate = useNavigate();
 const location = useLocation();


 

  const [open, setOpen] = useState(false)
  const [likes, setLikes] = useState(false)
  const [openlike, setOpenlike] = useState(false)
  const [commentlen, setCommentlen] = useState(false)
  let colour;
  
  const { user } = useAuth();
  const [likecounter, setLikecounter] = useState();


  
  const [likedata] = useState({
    userid: user,
    blogid: id
  });

  const [blog,setBlog] = useState()

  
  const [dislikedata] = useState({
    id: id,
    userid: user
  });


useLayoutEffect(()=>{
  Api.get(`/blog/${id}`).then((res)=>{
    // // console.log(res)
    for(let i=0;i<res?.data?.likes.length;i++){
      if(res?.data?.likes[i]?.userid===user){
  // colour = likes ? "rgb(212, 8, 212)" : "#000";
      setLikes(true)
    }
 // // console.log(location);
  }
    setBlog(res.data);
  setLikecounter(res?.data?.likes.length)
  setCommentlen(res?.data?.comments.length)

   }).catch((err)=>{
    console.log(err)
   })
  }, [location, id, user]);

  const click = () =>{
    setOpen(!open)
  }
  const isLikes = async() =>{
    setLikes(!likes);
    if(likes){
      // console.log(dislikedata)
      await Api.put("/dislikes", dislikedata).then((res)=>{
        // console.log(res.data);
      }).catch((err)=>{
        console.log(err)
      })
      setLikecounter(likecounter - 1)
    }else{
      // console.log(likedata)
      // console.log(likes)
      setLikecounter(likecounter + 1)
      await Api.post("/likes", likedata).then((res)=>{
        // console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
      
          }
        }
  
 const hegh = open ? "block" : "none"; 
  colour = likes ? "rgb(212, 8, 212)" : "#000";
 
 const [comments, setComments] = useState({
  blogid: id,
  userid: user,
  comment: ""
})

 const postComment = async() =>{
   setComments({...comments, userid: user})
   // // console.log(comments);

  await Api.post("/comment", comments).then((res)=>{
    // // console.log(res)
    navigate(`/blog/${id}`)
  }).catch((err)=>{
    console.log(err)
  })
  setComments({...comments, comment: ""})
 }

 const deleteBlog = () =>{
  Api.delete(`/blogdelete/${id}`).then((res)=>{
    // // console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
  
 }

  return (
    <div>
      <Helmet>
        <title>{blog?.thought}</title>
        <meta name="description" content='search your thought related to your situation' />
      </Helmet>
     <div className='blogOne'>
          <div className='blogUserData'>
            <p className='userId'>{blog?.userId}
            {
              (blog?.userId===user &&
                <span> 
                <Link to={`/edit-blog/${blog?._id}`}><CiEdit className='editIcon icon'/> </Link>
                <MdDelete onClick={deleteBlog} className='deleteIcon icon'/>
                </span>
                )
            }
             
              </p>
           
          </div>
        <div className='blogImg'>
          <img src={`/images/${blog?.images}`} className="blogImage"  alt='blogImage'/>
        </div>
        <div className='blogContent'>
          <h2 className='title'>{blog?.thought}</h2>
          <p className='title'>
          {blog?.title}
          </p>
        </div>
        <div className='blogNavigation'>
            <div className='likes' onClick={isLikes}><BiSolidLike className="icons like" style={{color: colour}} /> Likes  <span className='likeCounter'>{likecounter} </span></div>
            {blog?.userid !== user && <div className='openCont' onClick={()=> setOpenlike(!openlike)}>
              {
                openlike ? < MdKeyboardArrowUp/> : <MdKeyboardArrowDown className='openlike'/>
              }
              </div>
}

            <div className='comment' onClick={click}>
            <FaCommentAlt className="icons" /> Comment 
            <span className='commentCounter'>{commentlen}</span>
            </div>
        </div>
{openlike && <div className='likeData'>{

blog?.likes.reverse().map((blog, index)=>{
                 return blog ? <div className='likedUser' key={index}>
                  {blog?.userid}
                </div> : <div className='likedUser'>
                  no liked user found 
                </div>
                })
}
        </div>

}  
      <div className='commentData' style={{display: hegh}}>
        <IoCloseSharp onClick={click} className='close'/>

            <div className='commentPost'>
                <p className='commentId'>{user}</p>
                <div className='commentForm'>
                <textarea placeholder='Comment here ...' name="comment" value={comments.comment} onChange={(e)=>setComments({...comments, [e.target.name]: e.target.value})}></textarea>
                <button className='post' onClick={postComment}><MdSend /></button>
                </div>
            </div>

<h3>Comments :-</h3>
{blog?.comments.reverse().map((blog, index)=>{
return <div className='comments' key={index}>
<p className="commentsId">{blog?.userid}
{
// blog?.userid === user && 
<span>
  <Link to={`/blog/${id}/edit-comment/${id}/${blog?._id}`}><CiEdit className='editIcon icon'/> </Link> 
<Link to={`/blog/${id}/delete-comment/${id}/${blog?._id}`}><MdDelete className='deleteIcon icon'/></Link> 
</span>}
</p> 
{/* -------------EDIT COMMENT--------------------------  */}
<div>
  <Routes>
     <Route path="/edit-comment/:blogid/:commentid" element={<EditComment />}/>
     <Route path="/delete-comment/:blogid/:commentid" element={<DeleteComment />}/>
  </Routes>

</div>
<p className='thought'>
{blog?.comment}
</p>
</div>
 })

}            
        </div>


        </div>
    </div>
  )
}

export default Blog

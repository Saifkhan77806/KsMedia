import React,{useState} from 'react'
import Api from "./Api"
import {useParams, Link, useNavigate} from "react-router-dom";

function EditComment() {
  const {blogid, commentid} = useParams();
  const navigate = useNavigate(); 
  const [editdata, setEditdata] = useState({
    blogid,
    commentid,
    comment:""
  });

  const update = async()=>{
try{
await Api.put("/editcomment", editdata).then((res)=>{
  navigate(`/blog/${blogid}`)
  console.log(res.data)

}).catch((err)=>{
  console.log(err);
})
}catch(err){
  console.log(err)
}
  }

  return (
    <div>
      <input type="text" name="comment" onChange={(e)=> setEditdata({...editdata, [e.target.name]: e.target.value})} placeholder='Edit your comment here !!'/>
      <div className='btn'>
    <button className='update' onClick={update}>Update</button>
    <Link to={`/blog/${blogid}`}><button className='cancel'>Cancel</button></Link>
      </div>
    </div>
  )
}

export default EditComment

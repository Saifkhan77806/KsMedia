import React,{useState} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import Api from "./Api"

function DeleteComment() {

const {blogid, commentid} = useParams();
const navigate = useNavigate();
const [deletedata] = useState({
    blogid,
    commentid
})

const deletes = async()=>{
try{
    await Api.put(`/deletecomment`, deletedata).then((res)=>{
        // console.log(res.data)
        navigate(`/blog/${blogid}`)
    }).catch((err)=>{
console.log(err);
    })

}catch(err){
    console.log(err);
}
}

  return (
    <div className="edDelContainer">
     <p>Do you really want's to delete thiss comment !</p>
     <div className='btn'>
     <button className="delete" onClick={deletes}>Delete</button>
     <Link to={`/blog/${blogid}`}><button className='cancel'>Cancel</button></Link>
     </div>
    </div>
  )
}

export default DeleteComment

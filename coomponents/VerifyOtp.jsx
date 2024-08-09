import React,{useState} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import Api from "./Api"

function VerifyOtp() {

  const {id} = useParams();
  const navigate = useNavigate();

  const [userOtp, setUserOtp] = useState({
    userOtp: ""

  })

  const submits = async(e) =>{
    e.preventDefault();
    console.log(userOtp, id);

    await Api.post("/verfiy-otp", userOtp).then((res)=>{
    console.log(res.data)
    if(res.data.success){
      navigate(`/reset-password/${id}`);
    }else{
      alert(res.data.msg);
    }
   }).catch((err)=>{
    console.log(err)
   })
  }

  return (
    <div>
       <div className='loginContainer'>
<div className="container">
  <h1>Verify OTP</h1>
    <input type="gmail" name="name" onChange={(e)=> setUserOtp({...userOtp, userOtp:e.target.value})} value={userOtp.userOtp} placeholder="enter name here" />
    <input type="submit" name="submit" onClick={submits} />
</div>
</div>
    </div>
  )
}

export default VerifyOtp

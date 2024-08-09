import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
import Api from "./Api"

function ForgotPassword() {
  const navigate = useNavigate();

    const [emails, setEmails] = useState({
        email: ""
    })

    const submits = async(e) =>{
        e.preventDefault();
        // console.log(emails);
        await Api.post("/send-otp", emails).then((res)=>{
            // console.log(res.data);
            navigate(`/verify-otp/${res.data.msg}`);
            
        }).catch((err)=>{
            console.log(err);
        })
    }


  return (
    <div>
      <div className='loginContainer'>
<div className="container">
  <h1>Forgot Password</h1>
    <input type="gmail" name="name" onChange={(e)=> setEmails({...emails, email:e.target.value})} value={emails.emails} placeholder="enter name here" />
    <input type="submit" name="submit" onClick={submits} />
</div>
</div>
    </div>
  )
}

export default ForgotPassword

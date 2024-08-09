import React,{useState} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import Api from "./Api";

function ResetPassword() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [pass, setPass] = useState({
    _id:id,
    password: "",
    cpassword: ""
    })

    const submits = (e) =>{
        e.preventDefault();
        console.log(pass);
        Api.post("/update-password", pass).then((res)=>{
            console.log(res.data)
            navigate("/login");
        }).catch((err)=>{
            console.log(err);
        })
    }

  return (
    <div>
       <div className='loginContainer'>
<div className="container">
  <h1>Reset Password</h1>
    <input type="text" name="name" value={pass.password} onChange={(e) => setPass({...pass, password: e.target.value})} placeholder="enter password here" />
    <input type="text" name="name" value={pass.cpassword} onChange={(e) => setPass({...pass, cpassword: e.target.value})} placeholder="enter confirm password here" />
    <input type="submit" name="submit" onClick={submits}/>
</div>
</div>
    </div>
  )
}

export default ResetPassword

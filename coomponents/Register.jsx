import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import Api from "./Api"

export default function Register() {
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    })

    const [data,setData] = useState("");


    const inputs = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const navigate = useNavigate();

    const {storetokenInls} = useAuth();

    const submits = async(e)=>{
    e.preventDefault();
   await Api.post("/register", user).then((res)=>{

    if(res.data.success){
    // console.log(res.data.tokenCreated);
    storetokenInls(res.data.tokenCreated);
  navigate("/");

}else{
  // console.log(res.data);
  setData(res.data.msg);
}
    // if(res.status===200){
      // }
    }).catch((err)=>{
      console.log(err)
    })

    setUser({
      name:"",
      email:"",
      password:"",
      cpassword:""
  })
    // console.log(user);
    
    }

  return (
    <div className='registerContainer'>
    <div className="container">
      <h1>Register</h1>
        <input type="text" name="name" onChange={inputs} value={user.name} placeholder="enter name here" />
        <input type="email" name="email" onChange={inputs} value={user.email} placeholder="enter email here" />
        <input type="password" name="password" onChange={inputs} value={user.password} placeholder="enter password here" />
        <input type="password" name="cpassword" onChange={inputs} value={user.cpassword} placeholder="enter confirm password here" />
        <p style={{color: "red"}}>{data}</p>
        <input type="submit" name="submit" onClick={submits} />
    </div>
    </div>
  )
}

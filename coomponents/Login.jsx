import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/auth'
import Api from "./Api"


export default function Login() {
  const [user,setUser] = useState({
    name:"",
    password:""
})

const [data,setData] = useState("");


const navigate = useNavigate();
const {storetokenInls} = useAuth();

const inputs = (e)=>{
    setUser({...user,[e.target.name]:e.target.value});
}

const submits = async(e)=>{
e.preventDefault();
await Api.post("/login", user).then((res)=>{
  if(res.data.success){
    // console.log(res.data.tokenCreated);
    storetokenInls(res.data.tokenCreated);
  navigate("/");

}else{
  // console.log(res.data);
  setData(res.data.msg);
}
}).catch((err)=>{
  console.log(err)
});
// console.log(user);

setUser({
  name:"",
  password:""
});

// navigate("/");



}

return (
<div className='loginContainer'>
<div className="container">
  <h1>Login</h1>
    <input type="text" name="name" onChange={inputs} value={user.name} placeholder="enter name here" />
    <input type="password" name="password" onChange={inputs} value={user.password} placeholder="enter password here" />
    <p style={{color: "red"}}>{data}</p>
    <Link to="/forgot-password"> Forgot password</Link>
    <input type="submit" name="submit" onClick={submits} />
</div>
</div>
)
}

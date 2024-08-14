import React,{useState} from 'react'
import Logo from "../images/logo2.png"
import { Link } from 'react-router-dom'
import Profile from './Profile'
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {

  const [isOpen, setIsopen] = useState(false)

  return (
    <>
    <div className='w-[100%] bg-green-600 flex items-center justify-between sticky top-0 left-0 py-2 px-2'>
      <img src={Logo} alt="Logo" className='w-[10%]'/>
      <div className='block max-[768px]:hidden'>
        <button className='border-none outline-none mr-3'>
          <Link to="register">Register</Link>
        </button>
        <button className='border-none outline-none mr-3'>
          <Link to="/login">Login</Link>
        </button>
        <Profile />
      </div>
      {
        isOpen ? 
        <IoCloseSharp className='hidden max-[768px]:inline-block' onClick={()=> setIsopen(!isOpen)}/> :
        <FiMenu className='hidden max-[768px]:inline-block' onClick={()=> setIsopen(!isOpen)}/> 
      }
    </div>
      {
        isOpen && (
          <div className='hidden max-[768px]:block '>
           <ul>
            <li>
              Homes
            </li>
            <li>
              Search
            </li>
            <li>
              Trending
            </li>
           </ul>
           <div className='flex'>  
            <button className='border-none outline-none mr-3'>
          <Link to="register">Register</Link>
        </button>
        <button className='border-none outline-none mr-3'>
          <Link to="/login">Login</Link>
        </button>
        <Profile />
        </div>
          </div>
        )
      }
  </>
  )
}

export default Navbar
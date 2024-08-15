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
        <button className='border-none outline-none mr-3'>
          <Link to="/logout">Logout</Link>
        </button>
        <Profile />
      </div>
      {
        isOpen ? 
        <IoCloseSharp className='hidden max-[768px]:inline-block cursor-pointer' onClick={()=> setIsopen(!isOpen)}/> :
        <FiMenu className='hidden max-[768px]:inline-block cursor-pointer' onClick={()=> setIsopen(!isOpen)}/> 
      }
    </div>
      {
        isOpen && (
          <div className='hidden max-[768px]:block bg-green-600 pb-3 '>
           <ul className=' bg-green-600 w-[100%]'>
            <li className='py-3 border-gray-700 hover:bg-green-800 transition-all pl-3 hover:font-bold cursor-pointer'>  
              Homes
            </li>
            <li className='py-3 border-gray-700 hover:bg-green-800 transition-all pl-3 hover:font-bold cursor-pointer'>  
              Search
            </li>
            <li className='py-3 border-gray-700 hover:bg-green-800 transition-all pl-3 hover:font-bold mb-1 cursor-pointer'>  
              Trending
            </li>
           </ul>
           <div className='flex'>  
            <button className='border-none outline-none mr-3 ml-3 transition-all hover:font-bold hover:bg-gray-200'>
          <Link to="register">Register</Link>
        </button>
        <button className='border-none outline-none mr-3 transition-all hover:font-bold hover:bg-gray-200'>
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
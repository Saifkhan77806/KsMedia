import { useState } from 'react'
import logo from "../images/logo2.png"
import './App.css'
import Register from '../coomponents/Register';
import Login from "../coomponents/Login"
import Home from '../coomponents/Home';
import UserBlog from '../coomponents/UserBlog';
import CreateBlog from '../coomponents/CreateBlog';
import { Route, Routes, Link } from 'react-router-dom';
import Blog from '../coomponents/Blog';
import EditComment from '../coomponents/EditComment';
import DeleteComment from '../coomponents/DeleteComment';
import Profile from "../coomponents/Profile"
import { StickyNavbar } from '../coomponents/Navbar';


function App() {
  


  return (
    <> 
   <StickyNavbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path="/blog/:id/edit-comment/:blogid/:commentid" element={<EditComment />}/>
        <Route path="/blog/:id/delete-comment/:blogid/:commentid" element={<DeleteComment />}/>
    </Routes>
    </>
  )
}

export default App

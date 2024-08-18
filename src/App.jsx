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
import Navbar from "../coomponents/Navbar"
import { Logout } from '../pages/Logout';


function App() {
  


  return (
    <> 
   <Navbar />
    <Routes>
      <Route path='/logout' element={<Logout />}/>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path="/blog/:id/edit-comment/:blogid/:commentid" element={<EditComment />}/>
        <Route path="/blog/:id/delete-comment/:blogid/:commentid" element={<DeleteComment />}/>
        <Route path='/create-blog' element={<CreateBlog />}/>
    </Routes>
    </>
  )
}

export default App

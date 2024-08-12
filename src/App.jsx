import { useState } from 'react'
import './App.css'
import Register from '../coomponents/Register';
import Home from '../coomponents/Home';
import UserBlog from '../coomponents/UserBlog';
import CreateBlog from '../coomponents/CreateBlog';
import { Route, Routes } from 'react-router-dom';
import Blog from '../coomponents/Blog';
import EditComment from '../coomponents/EditComment';
import DeleteComment from '../coomponents/DeleteComment';


function App() {
  


  return (
    <>  <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blog/:id/edit-comment/:blogid/:commentid" element={<EditComment />}/>
        <Route path="/blog/:id/delete-comment/:blogid/:commentid" element={<DeleteComment />}/>
    </Routes>
    </>
  )
}

export default App

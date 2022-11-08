import './App.css'
import {Routes, Route, NavLink} from 'react-router-dom';
import React, { lazy } from 'react';
import Home from './routes/Home';
import Post from './routes/Post';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/post" element={<Post/>}/>
    </Routes>
  )
}

export default App

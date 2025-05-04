import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import Blog from './pages/Blog.jsx'
import HomePage from './pages/HomePage.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>


    <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />

      </Routes>
    </>
  )
}

export default App

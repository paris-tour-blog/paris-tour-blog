import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import Blog from './pages/Blog.jsx'
import HomePage from './pages/HomePage.jsx';
import NavBar from './components/NavBar.jsx'
import About from './pages/About.jsx';
import CreateBlogPostMuseum from './pages/CreateBlogPostMuseum.jsx'
import CreateBlogPostFriperie from './pages/CreateBlogPostFriperie.jsx'
import CreateBlogPostRestaurant from './pages/CreateBlogPostResto.jsx';
import Museums from './pages/Museums.jsx';
import Friperies from './pages/Friperies.jsx';
import Footer from './components/Footer.jsx';
import Restaurants from './pages/Restaurants.jsx';
import MuseumPosts from './pages/MuseumPosts.jsx';
import FriperiesPosts from './pages/FriperiesPosts.jsx';
import RestaurantsPosts from './pages/RestaurantsPosts.jsx';
import EditBlogs from './pages/EditBlog.jsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import EditBlogFriperies from './pages/EditBlogFriperies.jsx';
import EditBlogRestaurant from './pages/EditBlogRestaurant.jsx'

function App() {
  

  return (
    <>

<MantineProvider>
    
    
    
    <NavBar />

    <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/About" element={<About />} />
        <Route path="/CreateBlogPostMuseum" element={<CreateBlogPostMuseum />} />
        <Route path="/CreateBlogPostFriperie" element={<CreateBlogPostFriperie />} />
        <Route path="/CreateBlogPostResto" element={<CreateBlogPostRestaurant />} />
        <Route path="/Museums" element={<Museums />} />
        <Route path="/Friperies" element={<Friperies />} />
        <Route path="/Restaurants" element={<Restaurants />} />
        <Route path="/MuseumPosts/:id" element={<MuseumPosts  />} />
        <Route path="/FriperiesPosts/:id" element={<FriperiesPosts />} />
        <Route path="/RestaurantsPosts/:id" element={<RestaurantsPosts />} />
        <Route path="/EditBlogs/:id" element={<EditBlogs />} />
        <Route path="/EditBlogFriperies/:id" element={<EditBlogFriperies />} />
        <Route path="/EditBlogRestaurant/:id" element={<EditBlogRestaurant />} />

        
      </Routes>

      <Footer />
      </MantineProvider>
    </>
  )
}

export default App

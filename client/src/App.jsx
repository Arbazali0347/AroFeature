import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ThemeLayout from './components/ThemeLayout'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Vote from './pages/Vote'
import FounderAdditionalData from './pages/FounderAdditionalData'
import { Toaster } from "react-hot-toast"
import Dashboard from './pages/Dashboard'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <div className='bg-black'>
      <ScrollToTop/>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/features' element={<Features />} />
        <Route path='/vote' element={<Vote />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/founder-additional-details" element={<FounderAdditionalData />} />
      </Routes>
    </div>
  )
}

export default App
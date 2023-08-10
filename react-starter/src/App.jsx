
import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import VideoSection from './VideoSection'



function App() {

  return (
    <>
    <div class="main-container">
      <Navbar/>
      <div class="container-2">
        <Sidebar></Sidebar>
        <VideoSection></VideoSection>
      </div>
    </div>

    </>
  )
}

export default App

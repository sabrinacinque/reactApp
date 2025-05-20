//import { useState } from 'react'
import './App.css'
import Header  from './fragments/Header'  
import Vetrina from './pages/Vetrina'
import ChiSiamo from './pages/ChiSiamo'
import Contatti from './pages/Contatti'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Header />
      <br/>
      <Routes>
        <Route path="/" element={<Vetrina />} />
        <Route path="/chiSiamo" element={<ChiSiamo />} />
        <Route path="/contatti" element={<Contatti />} />

      </Routes>
      
      
    </>
  )
}

export default App

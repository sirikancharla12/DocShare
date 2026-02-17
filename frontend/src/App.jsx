import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import Signup from './components/signup'
import Login from './components/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>

    </>
  )
}

export default App

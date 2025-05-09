import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import BookingDetails from './components/BookingDetails'
import CreateBooking from './components/CreateBooking'
import EditBooking from './components/EditBooking'
import { useEffect, useState } from 'react'


function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(false)

  useEffect(()=>{
    const token=localStorage.getItem('token')

    if (token && token !== 'undefined' && token.length > 10) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  
  }, [])

  const handleLogin=()=>{
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }
  

  return (
    <>
      <div>
      <Router>
        <Routes>
         
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard onLogout={handleLogout}/> : <Navigate to="/" />} />
          <Route path="/booking/:id" element={isAuthenticated ? <BookingDetails /> : <Navigate to="/" />} />
          <Route path="/createbooking" element={isAuthenticated ? <CreateBooking /> : <Navigate to="/" />} />
          <Route path="/editbooking/:id" element={isAuthenticated ? <EditBooking /> : <Navigate to="/" />} />
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App

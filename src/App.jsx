import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import BookingDetails from './components/BookingDetails'
import CreateBooking from './components/CreateBooking'
import EditBooking from './components/EditBooking'


function App() {

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <div>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
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

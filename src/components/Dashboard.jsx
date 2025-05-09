import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const bookingsPerPage = 10
  const navigate = useNavigate()


  const fetchBookings = async () => {
    try {
      const res = await axios.get('https://681e02f2c1c291fa6632a487.mockapi.io/booking/booking')
      setBookings(res.data)
    } catch (err) {
      toast.error('Error fetching bookings')
      console.error('Fetch error:', err)
    }
  }

  useEffect(() => {
    fetchBookings();
  }, [])


  const indexOfLast = currentPage * bookingsPerPage
  const indexOfFirst = indexOfLast - bookingsPerPage
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast)


  const handleDetails = (id) =>{ 
    navigate(`/booking/${id}`)
}

  const handleEdit = (id) => navigate(`/editbooking/${id}`);


  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('No authentication token found');
      return
    }

    try {
     
      await axios.delete(`https://681e02f2c1c291fa6632a487.mockapi.io/booking/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })

    
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id))
      toast.success('Booking deleted successfully')
    } catch (err) {
      toast.error('Error deleting booking')
      console.error('Delete error:', err)
    }
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Bookings Dashboard</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            
            <th className="p-2 border">Check-in</th>
            <th className="p-2 border">Check-out</th>
        
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking) => (
            <tr key={booking.id}>
              <td className="p-2 border">{booking.id}</td>
              <td className="p-2 border">{booking.firstname || 'N/A'}</td>
              <td className="p-2 border">{booking.lastname || 'N/A'}</td>
             
              <td className="p-2 border">{booking.bookingdates?.checkin || 'N/A'}</td>
              <td className="p-2 border">{booking.bookingdates?.checkout || 'N/A'}</td>
    
              <td className="p-2 border space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDetails(booking.id)}
                >
                  View Details
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(booking.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(booking.id)} 
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: Math.ceil(bookings.length / bookingsPerPage) }, (_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-indigo-300' : ''}`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard



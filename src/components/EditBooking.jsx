import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = 'https://681e02f2c1c291fa6632a487.mockapi.io/booking/booking'

const getBookingById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`)
  return response.data

}

const updateBooking = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData)
  return response.data
}

function EditBooking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [editFormData, setEditFormData] = useState({
    firstname: '',
    lastname: '',
    totalprice: '',
    bookingdates: { checkin: '', checkout: '' }
  })

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const booking = await getBookingById(id);
        setEditFormData({
          ...booking,
          bookingdates: {
            checkin: booking.checkin || '',
            checkout: booking.checkout || ''
          }
        })
      } catch (err) {
        toast.error('Failed to load booking data');
        console.log(err);
      }
    }
    fetchBooking();
  }, [id]);

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value })
  }

  const handleDateChange = (e, field) => {
    setEditFormData(prev => ({
      ...prev,
      bookingdates: {
        ...prev.bookingdates,
        [field]: e.target.value
      }
    }))
  }

  const handleUpdate = async () => {
    try {
     
      const updatedData = {
        ...editFormData,
        checkin: editFormData.bookingdates.checkin,
        checkout: editFormData.bookingdates.checkout
      }
      delete updatedData.bookingdates

      await updateBooking(id, updatedData);
      toast.success('Booking updated successfully')
      navigate('/dashboard')
    } catch (err) {
      toast.error('Failed to update booking')
      console.error(err)
    }
  }

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
      <div className="space-y-4">
        <input
          name="firstname"
          value={editFormData.firstname}
          onChange={handleInputChange}
          placeholder="First Name"
          className="w-full border px-3 py-2"
        />
        <input
          name="lastname"
          value={editFormData.lastname}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="w-full border px-3 py-2"
        />
        <input
          name="totalprice"
          value={editFormData.totalprice}
          onChange={handleInputChange}
          placeholder="Total Price"
          className="w-full border px-3 py-2"
        />
        <input
          name="checkin"
          value={editFormData.bookingdates.checkin}
          onChange={(e) => handleDateChange(e, 'checkin')}
          placeholder="Check-in Date"
          className="w-full border px-3 py-2"
        />
        <input
          name="checkout"
          value={editFormData.bookingdates.checkout}
          onChange={(e) => handleDateChange(e, 'checkout')}
          placeholder="Check-out Date"
          className="w-full border px-3 py-2"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditBooking

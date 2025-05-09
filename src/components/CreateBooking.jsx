import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

function CreateBooking({ onBookingCreated }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    totalprice: '',
    depositpaid: false,
    checkin: '',
    checkout: '',
    additionalneeds: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: val
    })
  }

 
  const createBooking = async (bookingData) => {
    const response = await axios.post(
      'https://cors-anywhere.herokuapp.com/https://681e02f2c1c291fa6632a487.mockapi.io/booking/booking',
      bookingData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const bookingData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      totalprice: parseInt(formData.totalprice),
      depositpaid: formData.depositpaid,
      bookingdates: {
        checkin: formData.checkin,
        checkout: formData.checkout
      },
      additionalneeds: formData.additionalneeds
    }

    try {
      const data = await createBooking(bookingData)
      toast.success(`Booking created. ID: ${data.id}`)

      setFormData({
        firstname: '',
        lastname: '',
        totalprice: '',
        depositpaid: false,
        checkin: '',
        checkout: '',
        additionalneeds: ''
      })


      onBookingCreated?.()
    } catch (err) {
      toast.error("Something went wrong!")
      console.log(err);
    }
  }

  return (
    <div className="p-4 border mb-4 bg-white rounded shadow">
      <h1 className="text-lg font-semibold mb-3">Create New Booking</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="firstname" value={formData.firstname} placeholder="First Name" onChange={handleChange} required className="block w-full p-2 border" />
        <input type="text" name="lastname" value={formData.lastname} placeholder="Last Name" onChange={handleChange} required className="block w-full p-2 border" />
        <input type="number" name="totalprice" value={formData.totalprice} placeholder="Total Price" onChange={handleChange} required className="block w-full p-2 border" />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="depositpaid" checked={formData.depositpaid} onChange={handleChange} />
          <span>Deposit Paid</span>
        </label>

        <input type="date" name="checkin" value={formData.checkin} onChange={handleChange} required className="block w-full p-2 border" />
        <input type="date" name="checkout" value={formData.checkout} onChange={handleChange} required className="block w-full p-2 border" />
        <input type="text" name="additionalneeds" value={formData.additionalneeds} placeholder="Additional Needs" onChange={handleChange} className="block w-full p-2 border" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          Create Booking
        </button>
      </form>
    </div>
  )
}

export default CreateBooking

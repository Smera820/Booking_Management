import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

function BookingDetails() {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`https://681e02f2c1c291fa6632a487.mockapi.io/booking/booking/${id}`)
        setBooking(res.data);
      } catch (err) {
        toast.error("Failed to fetch booking details");
        console.log(err);
      }
    };

    fetchBooking()
  }, [id])

  if (!booking) return <div>Loading...</div>

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      <p><strong>ID:</strong> {booking.id}</p>
      <p><strong>First Name:</strong> {booking.firstname}</p>
      <p><strong>Last Name:</strong> {booking.lastname}</p>
      <p><strong>Total Price:</strong> {booking.totalprice}</p>
      <p><strong>Deposit Paid:</strong> {booking.depositpaid ? 'Yes' : 'No'}</p>
      <p><strong>Check-in:</strong> {booking.bookingdates?.checkin}</p>
      <p><strong>Check-out:</strong> {booking.bookingdates?.checkout}</p>
      <p><strong>Additional Needs:</strong> {booking.additionalneeds || 'None'}</p>

      <Link to="/dashboard" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
         Back to Dashboard
      </Link>
    </div>
  );
}

export default BookingDetails

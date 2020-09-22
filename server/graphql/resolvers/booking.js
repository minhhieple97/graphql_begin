const Booking = require("../../models/booking")
module.exports = {
  cancelBooking: async ({ bookingId }, { isAuth }) => {
    try {
      if (!isAuth) throw new Error("Unauthenticated!")
      const booking = await Booking.findById(bookingId)
      if (!booking) throw new Error("Booking not found!")
      await Booking.deleteOne({ _id: bookingId })
      return booking.event
    } catch (error) {
      throw error
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find()
      return bookings
    } catch (error) {}
  },
  bookEvent: async ({ eventId }, { isAuth }) => {
    try {
      if (!isAuth) throw new Error("Unauthenticated!")
      const event = await Event.findById(eventId)
      if (!event) throw new Error("Event not found!")
      const booking = new Booking({
        user: "5f6869ff45a8fe3ce1a481ea",
        event: eventId,
      })
      const result = await booking.save()
      return result
    } catch (error) {
      throw error
    }
  },
}

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const bcrypt = require("bcryptjs");
module.exports = {
  events: async () => {
    const result = await Event.find();
    return result.map((el) => ({
      ...el._doc,
      date: new Date(el._doc.date).toISOString(),
    }));
  },
  createEvent: async ({ eventInput }) => {
    try {
      const { title, description, price, date } = eventInput;
      const event = new Event({
        title,
        description,
        price: +price,
        date: new Date(date),
        creator: "5f6869ff45a8fe3ce1a481ea",
      });
      const eventRecord = await event.save();
      const user = await User.findById("5f6869ff45a8fe3ce1a481ea");
      if (!user) throw new Error("User not found!");
      user.createdEvents.push(eventRecord);
      await user.save();
      return eventRecord;
    } catch (error) {
      throw new Error(error);
    }
  },
  createUser: async ({ userInput }) => {
    try {
      const { email, password } = userInput;
      const checkUser = await User.findOne({ email });
      if (checkUser) throw new Error("User exists already.");
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, password: undefined };
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async () => {
    try {
    } catch (error) {}
  },
  cancelBooking: async () => {
    try {
    } catch (error) {}
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings;
    } catch (error) {}
  },
  bookEvent: async ({ eventId }) => {
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error("Event not found!");
      const booking = new Booking({
        user: "5f6869ff45a8fe3ce1a481ea",
        event: eventId,
      });
      const result = await booking.save();
      return result;
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async ({ bookingId }) => {},
};

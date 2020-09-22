const Event = require("../../models/event")
const User = require("../../models/user")
const Booking = require("../../models/booking")
module.exports = {
  events: async () => {
    const result = await Event.find()
    return result.map((el) => ({
      ...el._doc,
      date: new Date(el._doc.date).toISOString(),
    }))
  },
  createEvent: async ({ eventInput }, { isAuth, userId }) => {
    console.log(isAuth)
    if (!isAuth) throw new Error("Unauthenticated!")
    try {
      const { title, description, price, date } = eventInput
      const event = new Event({
        title,
        description,
        price: +price,
        date: new Date(date),
        creator: userId,
      })
      const eventRecord = await event.save()
      const user = await User.findById("5f6869ff45a8fe3ce1a481ea")
      if (!user) throw new Error("User not found!")
      user.createdEvents.push(eventRecord)
      await user.save()
      return eventRecord
    } catch (error) {
      throw new Error(error)
    }
  },
}

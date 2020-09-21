const express = require("express")
const app = express()
const bcrypt = require("bcryptjs")
const Event = require("./models/event")
const User = require("./models/user")
const cors = require("cors")
const mongoDb = require("./config/mongoDB")
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
require("dotenv").config()
app.use(cors())
app.use(express.json())
const user = async (userId) => {
  try {
    const user = await User.findById(userId)
    console.log(user)
    return {
      ...user._doc,
    }
  } catch (error) {
    throw error
  }
}
const events = (eventIds) => {
  return Event.find({ _id: { $in: eventIds } })
    .then((data) => {
      console.log(data)
      return data.map((event) => {
        console.log(event.creator)
        return { ...event._doc }
      })
    })
    .catch((err) => {
      throw err
    })
}
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    input EventInput {
      title: String!
      description: String
      price: Float!
      date: String
    }
    input UserInput {
      email: String!
      password: String!
    }
    type User {
      _id: ID!
      email: String!
      password: String!
      createdEvents:[Event!]
    }
    type Event {
      _id: String
      title: String!
      description: String
      price: Float!
      date: String
      creator: User!
    }
    type RootQuery {
       events: [Event!]!
    }
    type RootMutation {
        createEvent(eventInput:EventInput): Event
        createUser(userInput:UserInput): User
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }    
`),
    rootValue: {
      events: async () => {
        const result = await Event.find().populate("creator")
        return result.map((event)=>{
          return {...event._doc}
        })
      },
      createEvent: async ({ eventInput }) => {
        try {
          const { title, description, price, date } = eventInput
          const event = new Event({
            title,
            description,
            price: +price,
            date: new Date(date),
            creator: "5f6869ff45a8fe3ce1a481ea",
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
      createUser: async ({ userInput }) => {
        try {
          const { email, password } = userInput
          const checkUser = await User.findOne({ email })
          if (checkUser) throw new Error("User exists already.")
          const hashedPassword = await bcrypt.hash(password, 12)
          const user = new User({
            email,
            password: hashedPassword,
          })
          const result = await user.save()
          return { ...result._doc, password: undefined }
        } catch (error) {
          throw error
        }
      },
    },
    graphiql: true,
  })
)
app.use("/", (req, res) => {
  res.json({ status: 200 })
})
mongoDb()
app.listen(8080, () => {
  console.log("Server now listening for request on port 8080")
})

const express = require("express")
const app = express()
const cors = require("cors")
const connectMongodb = require("./config/mongodb")
const { graphqlHTTP } = require("express-graphql")
const Schema = require("./graphql/schema")
const RootValue = require("./graphql/resolvers")
const isAuth = require("./middleware/isAuth")
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use(isAuth)
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    rootValue: RootValue,
    graphiql: true,
  })
)
app.use("/", (err, req, res, next) => {
  res.json({ status: 400, message: err.message })
})

connectMongodb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server now listening for request on ${process.env.PORT}...`)
    })
  })
  .catch((err) => {
    console.log(err)
  })

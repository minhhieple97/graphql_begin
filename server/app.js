const express = require("express")
const app = express()
const schema = require("./schema/schema")
const { graphqlHTTP } = require("express-graphql")
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }))
app.listen(3000, () => {
  console.log("Server now listening for request on port 3000")
})

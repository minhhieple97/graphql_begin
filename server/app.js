const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
app.use("/graphql", graphqlHTTP({}));
app.listen(3000, () => {
  console.log("now listening for request on port 4000");
});

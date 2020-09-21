const express = require("express");
const app = express();
const cors = require("cors");
const connectMongodb = require("./config/mongodb");
const { graphqlHTTP } = require("express-graphql");
const Schema = require("./graphql/schema");
const RootValue = require("./graphql/resolvers");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    rootValue: RootValue,
    graphiql: true,
  })
);
app.use("/", (req, res) => {
  res.json({ status: 200 });
});
connectMongodb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server now listening for request on ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const mongoose = require("mongoose");
const connectMongodb = () => {
  mongoose.set("useFindAndModify", false);
  const URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0-yqgau.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
  return mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
module.exports = connectMongodb;

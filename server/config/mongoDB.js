const mongoose = require("mongoose")
const connectDB = () => {
  mongoose.set("useFindAndModify", false)
  const URI = `mongodb+srv://hieple:${process.env.MONGODB_PW}@cluster0-yqgau.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  return mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`MongoDB Connected…`)
    })
    .catch(console.log)
}
module.exports = connectDB

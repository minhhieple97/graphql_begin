const User = require("../../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { isError } = require("lodash")
module.exports = {
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
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email })
      if (!user) throw Error("Incorect Email or Password!")
      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) throw Error("Incorect Email or Password!")
      const token = jwt.sign(
        { userId: user.id, email },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "1h",
        }
      )
      return {
        userId: user.id,
        token,
        tokenExpiration: 1,
      }
    } catch (error) {
      throw error
    }
  },
}

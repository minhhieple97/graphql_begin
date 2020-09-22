const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization")
    if (!authHeader) {
      req.isAuth = false
      return next()
    }
    const token = authHeader.split(" ")[1]
    if (!token || token === "") {
      req.isAuth = false
      return next()
    }
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY)
    if (!decodedToken) {
      req.isAuth = false
      return next()
    }
    req.isAuth = true
    req.userId = decodedToken.userId
    return next()
  } catch (error) {
    req.isAuth = false
    return next(error)
  }
}

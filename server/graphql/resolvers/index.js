const authResolver = require("./auth")
const eventSResolver = require("./events")
const bookingResovler = require("./booking")
const rootResolver = {
  ...authResolver,
  ...eventSResolver,
  ...bookingResovler,
}
module.exports = rootResolver

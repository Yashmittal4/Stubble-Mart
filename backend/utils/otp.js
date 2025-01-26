const randomstring = require("randomstring")

function generateOTP() {
  return randomstring.generate({ length: 4, charset: "numeric" })
}

module.exports = { generateOTP }


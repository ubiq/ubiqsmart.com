let util = require('ethereumjs-util')

module.exports = {
  // return checksum address
  toChecksumAddress: function (address) {
    return util.toChecksumAddress(address)
  }
}

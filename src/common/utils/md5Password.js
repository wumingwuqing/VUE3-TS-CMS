const crypto = require('crypto')

function md5Password(password) {
  const md5 = crypto.createHash('md5')
  let md5pwd = ''
  try {
    md5pwd = md5.update(password.toString()).digest('hex')
  } catch (err) {
    console.log(err)
  }
  return md5pwd
}

module.exports = md5Password
const jwt = require('jsonwebtoken');

function verifyToken(token) {
  try {
    const code = jwt.verify(token, 'bbtjym');
    return code;
  } catch (err) {
    throw err;
  }
}
module.exports = { verifyToken };

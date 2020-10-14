const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports.verifyUser = async (req) => {
  try {
    req.email = null;
    req.loggedInUserId = null;
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      const result = jwt.verify(token, 'test');
      req.email = result.email;
      const userRecord = await User.findOne({ email: req.email });
      req.loggedInUserId = userRecord.id;
    }
  } catch (error) {
    throw error;
  }
};

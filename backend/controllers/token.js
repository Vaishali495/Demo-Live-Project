// creating signed token
// create token for user and get user details from token for verification
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.JWT_SECRET;
// console.log(secret) ;
// create a token 
function makeToken(userObj) {
  // console.log("token",userObj);
  const payload = {
    email: userObj.email,
    id: userObj.id,
  };
  return jwt.sign(payload, secret, { expiresIn: '2h'});
}
// verify token (decrypt)
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log(err);
    return null;
  }
}



module.exports = {
  makeToken,
  getUser,
};

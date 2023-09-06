const bcrypt = require("bcryptjs"); //for hashing the password

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};
module.exports = {hashPassword}

const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
module.exports = {comparePassword}
const { genSalt, hash } = require("bcrypt");

module.exports.encryptPassword = async (password) => {
  const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
  const newPassword = await hash(password, salt);

  return newPassword;
};

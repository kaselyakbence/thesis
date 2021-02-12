const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

const asyncScrypt = promisify(scrypt);

//Utility function that encrypts given string
const toHash = async (password) => {
  const salt = randomBytes(8).toString("hex");
  const buf = await asyncScrypt(password, salt, 64);

  return `${buf.toString("hex")}.${salt}`;
};

//Utility function compares an ecrypted string with a non-encrypted one
const compare = async (storedPassword, suppliedPassword) => {
  const [hashedPassword, salt] = storedPassword.split(".");

  const buf = await asyncScrypt(suppliedPassword, salt, 64);

  return buf.toString("hex") === hashedPassword;
};

module.exports = {
  toHash,
  compare,
};

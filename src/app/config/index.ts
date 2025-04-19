import "dotenv/config";

const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  default_pass: process.env.DEFAULT_PASS,
  bcrypt_salt: process.env.BCRYPT_SALT,
  node_env: process.env.NODE_ENV,
};

export default config;

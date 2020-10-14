const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const STATUS_CODES = {
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  STATUS_CODES,
};

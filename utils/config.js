require('dotenv').config();

const { PORT = 3000 } = process.env;
const { DB_MONGO = 'mongodb://localhost:27017/numberonedb' } = process.env;

module.exports = {
  PORT,
  DB_MONGO,
};

require('dotenv').config();
const client = require('./middleware/database');

const getDomains = async () => {
  const res = await client.query('SELECT * from domains');
  console.log(res.rows);
  await client.end();
};


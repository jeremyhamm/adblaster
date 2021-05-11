require('dotenv').config();
const client = require('./middleware/database');

const testQuery = async () => {
  const res = await client.query('SELECT * from domains');
  console.log(res);
  await client.end();
};
testQuery();


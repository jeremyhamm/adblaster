require('dotenv').config();
const axios = require('axios');
const client = require('./middleware/database');

/**
 * Format adlist text file into array of valid domains
 * @param {string} list 
 * @returns {array}
 */
const filterList = (list) => {
  const records = list.split('\n');
  return records.filter((word) => {
    return !word.includes('#');
  });
};

/**
 * Parse elements of adlist domain
 * @param {string} domain
 * @return {object}
 */
const parseDomain = (validDomains) => {
  let domainArr = [];          
  for (const domain of validDomains) {
    const ip = domain.match(new RegExp(/^\S*/));
    const address = domain.match(new RegExp(/(?<=\s).*/));
    if (ip[0] && address[0]) {
      domainArr.push(
        {
          ip: ip[0],
          address: address[0]
        }
      )
    }
  }
  return domainArr;
};

const saveDomain = async (domain) => {
  console.log(`Logging Domain: ${domain.address}`);
  const text = 'INSERT INTO domains (name, ip, host, category, owner, validated, created_date) VALUES($1, $2) RETURNING *';
  const values = ['KADhosts.txt', domain.ip, domain.address, 'suspicious', 'https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt', true, new Date().toString()];
  await client.query(text, values);
}

const readList = (url) => {
  axios.get(url)
  .then(response => {
    const filteredDomains = filterList(response.data);
    const domainObjects = parseDomain(filteredDomains);
    await saveDomain(domainObjects);
  });
}
readList('https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt');

// const getDomains = async () => {
//   const res = await client.query('SELECT * from domains');
//   console.log(res.rows);
//   await client.end();
// };


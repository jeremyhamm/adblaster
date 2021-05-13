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
}

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
}

const readList = (url) => {
  axios.get(url)
  .then(response => {
    const filteredDomains = filterList(response.data);
    const domainObjects = parseDomain(filteredDomains);
    console.log(domainObjects);
  });
}
readList('https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt');

// const getDomains = async () => {
//   const res = await client.query('SELECT * from domains');
//   console.log(res.rows);
//   await client.end();
// };


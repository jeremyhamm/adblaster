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

/**
 * Save all domains from list
 * @param {object} domain
 * @return {void}
 */
const saveDomain = async (domain) => {
  for (const record of domain) {
    console.log(`Logging Domain: ${record.address}`);
    const sql = `
      INSERT INTO domains (name, ip, host, category, owner, validated, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (host)
      DO NOTHING
    `;
    const date = new Date(Date.now()).toISOString();
    const values = ['KADhosts.txt', record.ip, record.address, 'suspicious', 'https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt', true, date, date];
    await client.query(sql, values);
  }
};

/**
 * Read list of domains from url
 * @param {string} url
 * @return {void}
 */
const readList = (url) => {
  axios.get(url)
  .then(async response => {
    const filteredDomains = filterList(response.data);
    const domainObjects = parseDomain(filteredDomains);
    await saveDomain(domainObjects);
  });
};
readList('https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt');


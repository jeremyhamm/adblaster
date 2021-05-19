require('dotenv').config();
const axios = require('axios');
const client = require('./middleware/database');
const fs = require('fs');

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
 * Process domain list in array of objects for saving in storage
 * @param {array} validDomains
 * @param {string} name
 * @param {string} owner
 * @param {string} category
 * @return {object}
 */
const processDomain = (validDomains, name, owner, category) => {
  let domainArr = [];          
  for (const domain of validDomains) {
    const ip = domain.match(new RegExp(/^\S*/));
    const address = domain.match(new RegExp(/(?<=\s).*/));
    if (ip[0] && address[0]) {
      domainArr.push(
        {
          ip: ip[0],
          address: address[0],
          name: name,
          owner: owner,
          category: category
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
      ON CONFLICT ON CONSTRAINT unique_host
      DO NOTHING
    `;
    const date = new Date(Date.now()).toISOString();
    const values = [record.name, record.ip, record.address, record.category, record.owner, true, date, date];
    await client.query(sql, values);
  }
};

/**
 * Read list of domains from url
 * @param {string} url
 * @return {void}
 */
const readList = (url, name, owner, category) => {
  axios.get(url)
  .then(async response => {
    let domain = filterList(response.data);
    domain = processDomain(domain, name, owner, category);
    await saveDomain(domain);
  });
};

/**
 * Process adlists.json
 */
let adlistRaw = fs.readFileSync('./static/adlists.json');
let jsonSources = JSON.parse(adlistRaw);
for (const source in jsonSources) {
  const name = source;
  const owner = jsonSources[name].url;
  const adlists = jsonSources[name].adlists;
  for (const list in adlists) {
    readList(adlists[list], name, owner, list);
  }
};
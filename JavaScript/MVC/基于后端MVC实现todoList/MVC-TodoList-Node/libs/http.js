const fetch = require('node-fetch');

async function httpGet (url) {
  const data = await fetch(url);
  const json = await data.json();

  return json;
}

async function httpPost (url, body) {
  const data = fetch(url, {
    method: 'post',
    body: JSON.parse(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const json = await data.json();

  return json;
}

module.exports = {
  httpGet,
  httpPost
}

const fetch = require('node-fetch');

const search_query = new URLSearchParams({ /* search_query: '%лос%',  */ page: 2 });
console.log(search_query.toString());

var myHeaders = new fetch.Headers();
myHeaders.append('Accept-Language', 'ru, ru-RUS;q=0.5');
myHeaders.append('Authorization', 'Bearer 21|yMz8IZjCButYILXvs3ekpdDSFIqgXtfvgmMVxwqB');
myHeaders.append('Content-Type', 'application/json');

console.log(myHeaders);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  //body: raw,
  redirect: 'follow',
};

fetch(`https://baniking.ru/api/v1/baths?${search_query}`, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log('error', error));

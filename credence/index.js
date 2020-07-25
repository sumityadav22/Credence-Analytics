const http = require('http');
const fs = require('fs')
const axios = require('axios');
const handlebars = require('handlebars');

var data_file = 'wheather-data.json';
var data_url = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22'

function fetchData() {
  axios.get(data_url).then(resp => {
      fs.writeFile(data_file, JSON.stringify(resp.data), function (err) {
        if (err) throw err;
        console.log('Data saved in: ', data_file);
      });
  });
}
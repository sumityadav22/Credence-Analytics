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


function renderHtml(templatefile, data){
  var source   = fs.readFileSync(templatefile,'utf8').toString();
  var template = handlebars.compile(source);

  var output = template(data);
  return output;
}


//  Generating HTML Report

function generateReport(report_type=1) {
  var data = JSON.parse(fs.readFileSync(data_file, 'utf8'));
  if (report_type == 1) {
    template_file = 'templates/template1.handlebars';
  }
  else if (report_type == 2) {
      data.main.temp = (data.main.temp - 273.15).toFixed(1)
      data.main.temp_min = (data.main.temp_min - 273.15).toFixed(1)
      data.main.temp_max = (data.main.temp_max - 273.15).toFixed(1)
      template_file = 'templates/template2.handlebars';
    }

  var result = renderHtml(template_file, data);
  return result
}

// Creating sever at localhost:8000

function serverResponse(req, res)
{
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(req.url === '/')
    {
      var result = fs.readFileSync('templates/home.html', 'utf8');
      res.write(result);
    }
    else if(req.url === '/fetch')
    {
      fetchData();
          
      var result = fs.readFileSync('templates/fetched.html', 'utf8');
      res.write(result);
    }
    else if(req.url === '/reports1') 
        {
          result = generateReport(1);
          res.write(result);
        }
    else if(req.url === '/reports2') {
          result = generateReport(2);
          res.write(result);
        }

    res.end();
}   

const server = http.createServer(serverResponse).listen(8000);
console.log('server is running at http://localhost:8000');
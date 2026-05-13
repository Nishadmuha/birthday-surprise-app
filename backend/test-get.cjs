const http = require('http');

http.get('http://localhost:5000/api/settings', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log(json.name);
  });
});

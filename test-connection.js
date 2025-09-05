// test-connection.js (ES Module)
import https from 'https';

const url = 'https://derensra.com/elfign-backend/api/health';

https.get(url, (res) => {
  let data = '';

  console.log(`Status Code: ${res.statusCode}`);

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Response:', json);
    } catch (err) {
      console.error('Error parsing JSON:', err);
      console.log('Raw response:', data);
    }
  });
}).on('error', (err) => {
  console.error('Request error:', err);
});

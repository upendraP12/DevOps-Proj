const http = require('http');
const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify({ username: 'admin', password: 'admin' }))
  }
};
const req = http.request(options, (res) => {
  console.log('STATUS', res.statusCode);
  console.log('HEADERS', JSON.stringify(res.headers));
  res.setEncoding('utf8');
  let raw = '';
  res.on('data', (chunk) => raw += chunk);
  res.on('end', () => { console.log('BODY', raw); process.exit(0); });
});
req.on('error', (e) => { console.error('ERROR', e.message); process.exit(1); });
req.write(JSON.stringify({ username:'admin', password:'admin' }));
req.end();

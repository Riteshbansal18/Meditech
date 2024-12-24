const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 5000;
const filePath = './users.json';

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]), 'utf8');
}

function sendJSONResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  if (method === 'OPTIONS') {
   
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  if (parsedUrl.pathname === '/add-user' && method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);

        if (!email || !password) {
          return sendJSONResponse(res, 400, { message: 'Email and password are required.' });
        }

        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading file:', err);
            return sendJSONResponse(res, 500, { message: 'Server error' });
          }

          const users = JSON.parse(data);
          users.push({ email, password });

          fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
              console.error('Error writing file:', err);
              return sendJSONResponse(res, 500, { message: 'Server error' });
            }

            sendJSONResponse(res, 200, { message: 'User added successfully.' });
          });
        });
      } catch (error) {
        console.error('Error processing request body:', error);
        sendJSONResponse(res, 400, { message: 'Invalid JSON format.' });
      }
    });
  } else if (parsedUrl.pathname === '/users' && method === 'GET') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return sendJSONResponse(res, 500, { message: 'Server error' });
      }

      const users = JSON.parse(data);
      sendJSONResponse(res, 200, users);
    });
  } else {
    sendJSONResponse(res, 404, { message: 'Endpoint not found' });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

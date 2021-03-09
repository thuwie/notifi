const { createServer } = require('http');
const { parse } = require('url');
const TelegramRequest = require('./src/TelegramRequest');
const PORT = process.env.PORT || 5000;

function handlePostRequest(request) {
  if (request.method === 'POST') {
    return new Promise(((resolve, reject) => {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      request.on('end', () => {
        return resolve(JSON.parse(body));
      });
      request.on('error', (error) => {
        return reject(error);
      });
    }));
  }
  // ?timestamp=timestamp
  if (request.method === 'PUT') {
    const queryObject = parse(request.url, true).query;
    countdown.setDeadline(queryObject.timestamp);
  }
}

const requestHandler = async (req, res) => {
  if (req.url === '/favicon.ico') return;
  const body = await handlePostRequest(req);
  if (body) {
    await new TelegramRequest(body).sendRequest();
  }
  res.end();
};

const server = createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server is listening on ${PORT}`);
});

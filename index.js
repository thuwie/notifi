const Countdown = require('./src/Countdown');

const { createServer } = require('http');
const TelegramRequest = require('./src/TelegramRequest');
const PORT = process.env.PORT || 5000


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
}

const requestHandler = async (req, res) => {
  if (req.url === '/favicon.ico') return;
  const body = await handlePostRequest(req);
  await new TelegramRequest(body).sendRequest();
  res.end();
};

const server = createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server is listening on ${PORT}`);
});

const countdown = new Countdown();
countdown.startTimer();

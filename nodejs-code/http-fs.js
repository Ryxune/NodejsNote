let http = require('http');
let fs = require('fs');

let port = 3000;
let hostname = '127.0.0.1';

let server = http.createServer();
server.on('request', (req, res) => {
  let { url } = req;

  if (url == '/') {
    fs.readFile('./resource/index.html', (err, data) => {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('文件读取失败,请稍后再试');
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(data);
      }
    })
  } else if (url == '/img') {
    fs.readFile('./resource/pic1.webp', (err, data) => {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('文件读取失败,请稍后再试');
      } else {
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(data);
      }
    })
  }
})

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
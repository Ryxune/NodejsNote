const fs = require('fs');
const http = require('http');

let template = require('art-template');

let port = 3111;
let hostname = '127.0.0.1';

const server = http.createServer();

server.on('request', (req, res) => {
  let { url } = req;
  console.log(url);
  if (url === '/' || url === '/index') {
    fs.readFile('./template.html', (error, data) => {
      if (error) {
        console.log('读取文件失败', error);
        return res.end('File Not Found')
      }
      data = data.toString();
      let ret = template.render(data, {
        lang: 'TypeScript'
      })
      res.end(ret);
    })
  } else {
    res.end('404 Not Found');
  }
})

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})

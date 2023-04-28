const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// \代表转义,路径中的\需要改为/
const wwwDir = 'E:/xp/nodejs/NodejsNote/nodejs-code/apache/www'

const server = http.createServer();

/**
 * Apache服务器默认有一个www目录
 * 访问方式:
 * 127.0.0.1:80/
 * 127.0.0.1:80/a.txt
 * 127.0.0.1:80/index.html
 * 127.0.0.1:80/aaa/bbb.md
 */


server.on('request', (req, res) => {
  const url = req.url;
  let path = url === '/' ? '/index.html' : url;

  fs.readFile(wwwDir + path, (error, data) => {
    if (error) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('404 Not Found')
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(data);
  })
  
})

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
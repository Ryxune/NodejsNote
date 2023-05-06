const http = require('http');
const fs = require('fs');
const url = require('url');

const template = require('art-template');

const hostname = '127.0.0.1';
const port = 3000;

const comments = []

http
  .createServer((req, res) => {
    const parseObj = url.parse(req.url, true);
    const pathname = parseObj.pathname;
    if (pathname === '/' || pathname === 'index') {
      fs.readFile('./views/index.html', (error, data) => {
        if (error) {
          return showError(res);
        }
        let htmlStr = template.render(data.toString(), {
          comments
        });
        res.end(htmlStr);
      })
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', (error, data) => {
        if (error) {
          return showError(res);
        }
        res.end(data);
      })
    } else if (pathname.indexOf('/public/') === 0) {
      fs.readFile('.' + pathname, (error, data) => {
        if (error) {
          return showError(res);
        }
        res.end(data);
      })
    } else if (pathname.indexOf('/node_modules/') === 0) {
      fs.readFile('.' + pathname, (error, data) => {
        if (error) {
          return showError(res);
        }
        res.end(data);
      })
    } else if (pathname === '/comment') {
      let comment = parseObj.query;
      const date = new Date();
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Shanghai",
      };
      comment.dateTime = date.toLocaleString('zh-CN', options);
      // comment.ip = req.socket.remoteAddress;
      comment.ip = req.socket.remoteAddress.replace('::ffff:', '');
      comments.unshift(comment);

      // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了

      // 如何通过服务器让客户端重定向？
      //    1. 状态码设置为 302 临时重定向
      //        statusCode
      //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
      //        setHeader
      // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
      // 所以你就能看到客户端自动跳转了
      res.statusCode = 302;
      // res.setHeader('Location', 'http://baidu.com')
      res.setHeader('Location', '/');
      res.end();
    } else {
      showError(res);
    }
  })
  .listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  })

  function showError(res) {
    fs.readFile('./views/404.html', (error, data) => {
      if (error) {
        return res.end('404 Not Found!');
      }
      res.end(data);
    }) 
  }
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // console.log(res.statusCode); // 200
  
  // 打印的内容在编辑器终端显示
  console.log('收到客户端的请求了，请求路径是：' + req.url);
  console.log('请求我的客户端的地址是：', req.socket.remoteAddress + ':' + req.socket.remotePort);

  if (req.url == '/html') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<p>hello html <a href="">点我</a></p>');
  } else {
    // text/plain 就是普通文本
    // text/html html格式的字符串
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    // 响应内容只能是二进制数据或者字符串
    // res.end('Hello World');

    var products = [{
      name: '苹果 X',
      price: 8888
    }, {
      name: '菠萝 X',
      price: 5000
    }, {
      name: '小辣椒 X1',
      price: 1999
    }]

    // 响应内容在浏览器显示
    res.end(JSON.stringify(products))
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
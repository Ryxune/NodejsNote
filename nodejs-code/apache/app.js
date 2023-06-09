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
  fs.readFile(wwwDir + '/template.html', (error, data) => {
    if (error) {
      res.end('404 Not Found')
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    data = data.toString();
    fs.readdir(wwwDir, (error, dirs) => {
      if (error) {
        return res.end('dir Not Found')
      }
      console.log(dirs);
      let content = '';
      dirs.forEach(item => {
        content += `
          <tr>
            <td data-value=".git/"><a class="icon dir" href="/${wwwDir}/${item}/">${item}</a></td>
            <td class="detailsColumn" data-value="0"></td>
            <td class="detailsColumn" data-value="1683248429">2023/5/5 09:00:29</td>
          </tr>
        `;
      })
      data = data.toString();
      data = data.replace('xxx', content);
      res.end(data)
    })
  })
  
})

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
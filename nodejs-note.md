## nodejs基础

### nodejs概述

- Node.js 是什么
  + JavaScript 运行时
  + 既不是语言，也不是框架，它是一个平台
- Node.js 中的 JavaScript
  + 没有 BOM、DOM
  + EcmaScript 基本的 JavaScript 语言部分
    * 变量
    * 方法
    * 数据类型
    * 内置对象
    * Array
    * Object
    * Date
    * Math
  + 在 Node 中为 JavaScript 提供了一些服务器级别的 API
    * 文件操作的能力
    * http 服务的能力
  + 模块系统
    * 在 Node 中没有全局作用域的概念
    * 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件
    * require 加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
      - 模块完全是封闭的
      - 外部无法访问内部
      - 内部也无法访问外部
    * 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
    * 但是某些情况下，模块与模块是需要进行通信的
    * 在每个模块中，都提供了一个对象：`module.exports` = `exports`
    * 该对象默认是一个空对象
    * 你要做的就是把需要被外部访问使用的成员手动的挂载到 `exports` 接口对象中
    * 然后谁来 `require` 这个模块，谁就可以得到模块内部的 `exports` 接口对象
  + 核心模块
    * 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如
      - fs 文件操作模块
      - http 网络服务构建模块
      - os 操作系统信息模块
      - path 路径处理模块
      - 。。。。
    * 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
      - `var fs = require('fs')`

### fs文件操作(file-system)

```js
var fs = require('fs')

fs.readFile('../nodejs-note.md', function (error, data) {
  // error 成功: null, 失败: 错误对象
  // data 成功: 十六进制数据数据, 失败: undefined

  // data: <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 0d 0a>
  // 文件中存储的其实都是二进制数据 0 1
  // 这里为什么看到的不是 0 和 1 呢？原因是二进制转为 16 进制了
  // 但是无论是二进制01还是16进制，人类都不认识
  // 所以我们可以通过 toString 方法把其转为我们能认识的字符

  if (error) {
    console.log('读取文件失败了')
    return
  }

  console.log('读取文件成功了')
  console.log(data.toString())
  
})

// 文件夹不存在会写入失败
fs.writeFile('./data/你好.md', '大家好，给大家介绍一下，我是Node.js', function (error) {
  if (error) {
    console.log('写入失败', error)
    return
  }

  console.log('写入成功了')
  
})
```

### http

  + 端口号
    * ip地址定位计算机
    * 端口号定位具体的应用程序
  + Content-Type
    * 服务器通过Content-Type把每次响应的数据的内容类型都告诉客户端
    * 不同的资源对应的`Content-Type`是不一样，具体参照：[oschina](https://tool.oschina.net/commons)
    * 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
    * 除了Content-Type可以指定编码,也可以在HTML页面中通过meta元数据来声明编码格式
  + 通过网络发送文件
    * 发送的并不是文件，本质上来讲发送是文件的内容
    * 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  // 打印的内容在编辑器终端显示
  console.log('收到客户端的请求了，请求路径是：' + req.url);
  console.log('请求我的客户端的地址是：', req.socket.remoteAddress + ':' + req.socket.remotePort);

  // 对于文本类型的数据，最好都加上编码Content-Type，防止中文解析乱码问题
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
```

### fs & http

```js
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

```

### 启动项目

```bash
node 文件名.js
```

nodemon 启动项目
```bash
nodemon 文件名
```
> 文件后缀名可省略


## 插件

### nodejs自动重启插件nodemon

**安装**
```bash
npm install --global nodemon
```
或
```bash
npm i -g nodemon
```

**启动**
```bash
nodemon app.js
```
> 后缀名可省略

**关闭**
```快捷键
Ctrl + C
```
**检查版本**
```bash
nodemon -v # nodemon --version
```


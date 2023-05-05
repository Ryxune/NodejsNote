# nodejs介绍

## Node.js 是什么

> Node.js是JavaScript 运行时,是JavaScript的运行平台,既不是语言，也不是框架。

**Node.js的特点**

- 浏览器中的JavaScript
  + EcmaScript
    * 基本语法
    * if
    * var
    * function
    * Object
    * Array
  + Bom
  + Dom
- Node.js 中的 JavaScript
  + 没有 BOM、DOM
  + EcmaScript 
  + 在 Node 中为 JavaScript 提供了一些服务器级别的 API
    * 文件操作的能力
    * http 服务的能力
    * 网络通信
    * 网络服务的构建
  + 没有全局作用域,只有模块作用域
    + 模块外部访问不到内部，内部也访问不到外部
    + 模块之间使用require和module.exports通信
- 构建于Chrome的V8引擎之上
  + 代码只是具有特定格式的字符串，引擎可以认识它，帮你解析和执行
  + Node.js的作者把Google Chrome中的V8引擎移植出来，开发了一个独立的JavaScript运行时环境
- Node.js uses an envent-driven,non-blocking I/O mode that makes it lightweight and efficent.
  +  envent-driven	事件驱动
  + non-blocking I/O mode   非阻塞I/O模型（异步）
  + ightweight and efficent.   轻量和高效
- Node.js package ecosystem,npm,is the larget scosystem of open sourcr libraries in the world
  + npm 是世界上最大的开源生态系统
  + 绝大多数JavaScript相关的包都存放在npm上，这样做的目的是为了让开发人员更方便的去下载使用

**使用Node编写应用程序主要就是在使用：**

- EcmaScript语言
  + 和浏览器一样，在Node中没有Bom和Dom

- 核心模块
  + 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
    + `var fs = require('fs')`
- 第三方模块
  + art-template
  + 必须通过npm来下载才可以使用
- 自己写的模块
  + 自己创建的文件
  + 相对路径必须加 ./

## Node能做什么

- web服务器后台
- 命令行工具
  + npm(node)
  + git(c语言)
  + hexo（node）
  + ...
- 对于前端工程师来讲，接触最多的是它的命令行工具
  + 自己写的很少，主要是用别人第三方的
  + webpack
  + gulp
  + npm

# 起步

## 安装Node环境

- [官网下载](https://nodejs.org/en/)
- 安装：
  + 傻瓜式安装，一路`next`
  + 安装过再次安装会升级
- 确认Node环境是否安装成功
  + 查看node的版本号：`node --version` 或者 `node -v`
- 配置环境变量

## 解析执行JavaScript

1. 创建编写JavaScript脚本文件
2. 打开终端，定位脚本文件的所属目录。（可直接在文件资源管理器路径栏输入cmd回车定位）
3. 输入`node 文件名`执行对应的文件

> 注意：文件名不要用`node.js`来命名，也就是说除了`node`这个名字随便起，最好不要使用中文。

# Node中的模块系统

模块系统是指用于组织和管理代码模块的一组规则、标准和机制。不同编程语言和平台的模块系统可能有所不同，但通常都包括以下基本功能：

- 模块定义和导入：定义模块的内容和接口，并能在其他模块中导入和使用这些功能。
- 命名空间隔离：确保不同模块定义的变量和函数名不会冲突或覆盖。
- 依赖管理：自动或手动处理模块之间的依赖关系，确保正确加载和执行所需的模块。
- 可重用性：使各个模块可以被其他项目所重用，从而提高代码的复用性和可维护性。

> JavaScript的模块系统有多种实现方式，如CommonJS、AMD、ES6 Modules等。在Node.js中，使用CommonJS规范来定义和导出模块，并使用require函数来加载模块。在现代浏览器中，支持原生的ES6 Modules来管理JavaScript代码的模块化。



## 什么是模块化

模块化是指将一个大型软件系统划分为多个独立的组件或模块，使得每个模块具有清晰的功能和接口，使得代码更易维护、重用和理解。将代码按照逻辑划分成多个模块之后，每个模块可以独立开发、测试和部署，从而提高代码质量和开发效率。模块化可用于不同编程语言和平台，如JavaScript模块化等。

## CommonJS模块规范

> CommonJS是一种模块规范，主要应用于服务器端的 JavaScript 环境，例如 Node.js。
> 通过 CommonJS 规范，我们可以将一个大型应用分解为多个小模块，使得代码更加可维护和可测试。

 CommonJS 模块的定义、使用和特点：

- 每个文件是一个模块，拥有自己的作用域。
- CommonJS 规范是同步加载模块，在浏览器端使用时需要进行打包和编译。
- 在模块内部，可以使用 require 方法加载其他模块。
- 在模块内部，可以使用 module.exports 导出当前模块的方法或变量，供其他模块使用。
	+ 该对象默认是一个空对象{}
	+ exports = module.exports 

以下是一个 CommonJS 模块的例子：
```JS
// hello.js
function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

module.exports = {
  sayHello: sayHello
};

// app.js
var hello = require('./hello');
hello.sayHello('World');

```

# 核心模块

- 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识
  + fs文件操作模块
  + http网络服务构建模块
  + url路径操作模块
  + path路径处理模块
  + os操作系统信息
  + ...

## fs文件操作(file-system)

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

## http

> IP地址是Internet Protocol地址的缩写，用于标识网络上的一台设备，通常由32位或128位数字组成，可以用来唯一地识别一台计算机在互联网或本地网络中的位置。
>
> 端口号是用于标识网络上的一条连接的数值，通常由16位数字组成，取值范围为0~65535。在一个设备上，不同的应用程序可以通过不同的端口号来与其他设备或应用程序进行通信，从而确保网络通信的可靠性和安全性。
>
> 一个IP地址和一个端口号的组合可以唯一标识一个网络上的应用程序或服务。例如，常见的HTTP应用程序使用80号端口，而HTTPS协议使用443号端口。当我们在浏览器中访问一个网站时，实际上是向该网站所在的IP地址和端口号发送请求和接收响应。

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

  // 默认会有一个 /favicon.ico 请求

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

## fs & http

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

## 其他常用核心模块

```js
// 用来获取机器信息的
var os = require('os')

// 用来操作路径的
var path = require('path')

// 获取当前机器的 CPU 信息
console.log(os.cpus())

// memory 内存
console.log(os.totalmem())

// 获取一个路径中的扩展名部分
// extname extension name
console.log(path.extname('c:/a/b/c/d/hello.txt'))
```

# 插件

## nodemon

> nodejs自动重启插件

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

## art-template

[官网](http://aui.github.io/art-template/zh-cn/index.html)
> JavaScript 模板引擎
> 它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器
> 模板引擎只关心自己认识的{{}} mustache语法,八字胡语法

**安装**

```bash
npm install art-template --save
```

### 浏览器中使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="../node_modules/art-template/lib/template-web.js"></script>
  <script id="tpl" type="text/template">
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      {{if user}}
        <h2>{{user.name}}</h2>
        我喜欢: {{each user.hobbies}}{{$value}} {{/each}}
      {{/if}}
    </body>
    </html>
  </script>
  <script>
    let ret = template('tpl', {
      user: {
        name: 'Diff',
        hobbies: ['熬夜','敲代码']
      },
    })
    console.log(ret);
  </script>
</body>
</html>
```

### Node中使用

```js
let template = require('art-template');

let ret = template.render("Hello {{lang}}", {
  lang: "NodeJs"
})

console.log(ret);
```

配合fs和http使用

```js
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

```

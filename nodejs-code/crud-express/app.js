const express = require("express");
const router = require('./router');

const app = express();

// 如果你没有手动设置模板文件夹的路径，Express 会默认去项目根目录下的 "views" 文件夹中寻找模板文件。
// 这个默认行为可以通过设置 app.set('views', '你的模板文件夹路径') 来修改。
// app.set('views', './views'); // 设置为相对路径
// app.set('views', path.join(__dirname, 'views')); // 设置为绝对路径
// app.get('/', function(req, res) {
//   res.render('index'); // 这里就默认去 "views/index" 文件夹中寻找模板
// });

app.use("/node_modules/", express.static("./node_modules/"));
app.use("/public/", express.static("./public/"));

app.engine("html", require("express-art-template"));

// 配置body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 将路由容器挂载到app
app.use(router);

app.listen(3000, () => {
  console.log("running...");
});

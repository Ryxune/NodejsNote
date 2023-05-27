
const express = require("express");

const User = require('./utils/user');

// 1.创建路由容器
const router = express.Router();

// 2.把路由挂在到 router 路由容器中
router.get("/users", (req, res) => {
  User.find((error, data) => {
    if (error) return res.status(500).send('Server error');
    res.render("./index.html", {
      users: data,
    });
  })
});

router.get("/users/new", (req, res) => {
  res.render('new.html');
});

router.post("/users/new", (req, res) => {
  User.save(req.body, (error) => {
    if (error) return res.status(500).send('Server error');
    res.redirect('/users');
  })
});

router.get("/users/edit", (req, res) => {
  User.findById(req.query.id, (error, data) => {
    if (error) return res.status(500).send('Server error');
    res.render('edit.html', {
      user: data
    })
  })
});

router.post("/users/edit", (req, res) => {
  User.updateById(req.body, (error) => {
    if (error) return res.status(500).send('Server error');
    res.redirect('/users');
  })
});

router.get("/users/delete", (req, res) => {
  User.delete(req.query.id, (error) => {
    if (error) return res.status(500).send('Server error');
    res.redirect('/users');
  })
});

// 3.导出路由
module.exports = router;

// 此方式也可以, 但express提供了一种以上更好的方式,专门处理路由
// module.exports = (app) => {
//   app.get("/", (req, res) => {
//     readFile('./db.json').then(data => {
//       console.log(data);
//       res.render("index.html", {
//         users: JSON.parse(data).users,
//       });
//     }, () => {
//       return res.status(500).send('Server error');
//     })
//   });
// }

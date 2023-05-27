# express curd

## 路由设计

| 请求方法 | 请求路径         | 参数                   | 备注             |
| -------- | ---------------- | ---------------------- | ---------------- |
| get      | /user        |                        | 渲染用户列表页面 |
| get      | /user/new    |                        | 渲染添加用户页面 |
| post     | /user/       | name/gender/hobbies    | 添加用户         |
| get      | /user/edit   | id                     | 渲染编辑用户页面 |
| post     | /user/edit   | id/name/gender/hobbies | 编辑用户信息     |
| get      | /user/delete | id                     | 删除用户         |
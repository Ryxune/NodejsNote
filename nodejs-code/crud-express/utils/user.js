const fs = require("fs");
const dbPath = "./db.json";

/**
 * 获取所有用户列表
 * return []
 */
exports.find = (callback) => {
  fs.readFile(dbPath, "utf8", (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(null, JSON.parse(data).users);
    }
  });
};

/**
 *
 * @param {id} params
 * @param user callback
 */
exports.findById = (id, callback) => {
  fs.readFile(dbPath, "utf8", (error, data) => {
    if (error) {
      return callback(error);
    }
    let users = JSON.parse(data).users;
    let user = users.find((user) => user.id == id);
    if (!user) return callback("未找到该用户");
    callback(null, user);
  });
};

/**
 * 添加保存用户
 */

exports.save = (params, callback) => {
  fs.readFile(dbPath, "utf8", (error, data) => {
    if (error) {
      return callback(error);
    }
    let users = JSON.parse(data).users;
    let maxId = users[0] ? users[0].id + 1 : 1;
    users.unshift({
      ...params,
      id: maxId,
    });
    fs.writeFile(dbPath, JSON.stringify({ users }), (err) => {
      if (error) {
        return callback(err);
      }
      callback(null);
    });
  });
};

/**
 * 更新用户
 */

exports.updateById = (params, callback) => {
  fs.readFile(dbPath, "utf8", (error, data) => {
    if (error) return callback(error);
    let users = JSON.parse(data).users;
    let index = users.findIndex((user) => user.id == params.id);
    if (index == -1) return callback("未找到该用户");
    users.splice(index, 1, { ...params, id: parseInt(params.id) });
    fs.writeFile(dbPath, JSON.stringify({ users }), (err) => {
      if (err) return callback(err);
      callback(null);
    });
  });
};

/**
 * 删除用户
 */

exports.delete = (id, callback) => {
  fs.readFile(dbPath, (error, data) => {
    if (error) return callback(error);
    let users = JSON.parse(data).users;
    let index = users.findIndex((user) => user.id == id);
    if (index == -1) return callback("未找到该用户");
    users.splice(index, 1);
    fs.writeFile(dbPath, JSON.stringify({ users }), (err) => {
      if (err) return callback(err);
      callback(null);
    });
  });
};

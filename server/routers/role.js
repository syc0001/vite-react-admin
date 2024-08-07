const RoleModel = require("../models/RoleModel");
const { pageFilter } = require("../utils");
/*
注册角色管理路由
*/
module.exports = function (router) {
  // 添加角色
  router.post("/manage/role/add", (req, res) => {
    const { roleName } = req.body;
    RoleModel.create({ name: roleName })
      .then((role) => {
        res.send({ status: 0, data: role });
      })
      .catch((error) => {
        console.error("添加角色异常", error);
        res.send({ status: 1, msg: "添加角色异常, 请重新尝试" });
      });
  });

  // 获取角色列表
  router.get("/manage/role/list", (req, res) => {
    const { pageNum, pageSize } = req.query;
    RoleModel.find({})
      .then((roles) => {
        res.send({
          status: 0,
          data: pageFilter(roles.reverse(), pageNum, pageSize),
        });
      })
      .catch((error) => {
        console.error("获取角色列表异常", error);
        res.send({ status: 1, msg: "获取角色列表异常, 请重新尝试" });
      });
  });

  // 更新角色(设置权限)
  router.post("/manage/role/update", (req, res) => {
    const role = req.body;
    role.auth_time = Date.now();
    RoleModel.findOneAndUpdate({ _id: role._id }, role)
      .then((oldRole) => {
        // console.log('---', oldRole._doc)
        res.send({ status: 0, data: { ...oldRole._doc, ...role } });
      })
      .catch((error) => {
        console.error("更新角色异常", error);
        res.send({ status: 1, msg: "更新角色异常, 请重新尝试" });
      });
  });

  //删除角色
  router.post("/manage/role/delete", (req, res) => {
    const role = req.body;
    RoleModel.deleteOne({ _id: role._id })
      .then((oldRole) => {
        res.send({ status: 0 });
      })
      .catch((error) => {
        console.error("删除角色异常", error);
        res.send({ status: 1, msg: "删除角色异常, 请重新尝试" });
      });
  });
};

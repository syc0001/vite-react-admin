# 通过 vite 搭建的react商品管理系统

## 采用技术: 
        vite + React + ts + React-router + Axios + Ant-design + React-redux

## 项目职责:
        1. 使用vite搭建基本项目结构, 对项目进行模块化划分, 并集成Axios请求库
        2. 利用Axios拦截器实现了权限校验,对系统的登入权限进行控制,避免了无效请求
        3. 通过localStorage保存用户的登录信息, 并且在登录过期的时候删除用户信息
        4. 负责整个商品管理系统，包括分类管理, 商品管理, 用户管理, 角色管理等界面
                使用 Antd 中 Button , Form , Modal ,Table , Card 等组件来展示页面
                使用echats制作图形图表界面
        5. 使用 React-router 来配置路由，实现组件间页面的跳转
        6. 通过React-router的lazy()实现按需加载, 提升用户体验
        7. 使用Axios来请求数据并渲染页面
        8. 根据需求文档完成业务逻辑

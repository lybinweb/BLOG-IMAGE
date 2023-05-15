
# 基于后端MVC架构实现TodoList

1. `yarn add node-fetch@2` 第二个版本是commonJS，第三个版本是ESModule
2. `yarn add mongoose`
3. `code runner` vscode插件 右键运行js代码

## API

- MVC-TodoList-API：`node端 API`
  - 主要负责TodoList API层

1. Controller层：调用Model层函数，实现每个API
2. Model层：操作数据库
3. 他是不负责View层的

## Node

- MVC-TodoList-Node：`服务端渲染`
  - 主要负责TodoList 服务端渲染

1. Controller层：组装每个页面的数据
2. View层：将Controller里组装的数据利用EJS模板渲染页面
3. 他是不负责Model层的

## 前后端分离之前

- MVC-TodoList-Full：`MVC架构实现todoList`

1. Controller层：调用Model函数，实现所有的API
2. Model层：操作数据库
3. View层：利用Controller拿到的数据使用EJS模板引擎渲染页面

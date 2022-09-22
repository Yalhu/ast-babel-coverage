

babel和ast（实现简单的babel插件）: https://juejin.cn/post/7078909564120203300#heading-2
```sh
npm install --save-dev @babel/core @babel/cli
./node_modules/.bin/babel src --out-dir lib

## 注意指令执行的时候，自定义插件的路径 
### 根目录可以执行成功
./node_modules/.bin/babel demo-ast/8-babel-plugins-tryCatch-test.js
### demo-aset目录可以执行成功
../node_modules/.bin/babel 8-babel-plugins-tryCatch-test.js

# 查看结果
node 8-babel-plugins-tryCatch-test.js

```
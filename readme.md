

1. 验证nyc覆盖率原理 - coverage-nyc
2. 学习ast基础知识及案例 - ast-tutial, ast-mori
3. 在ast基础上实践babel插件 - babel-plugins
4. 简单实现instrument - coverage-instument 
   未完成。nyc traverse实现的内容还是有些多。
5. node hooks魔法


```sh
### 0 验证nyc覆盖率原理
npx istanbul instrument ./test.js -o ./test.output.js
node ./test.output.js

### 4 简单实现instrument
cd coverage-nyc
node instrument.js ./testCase1.js
```



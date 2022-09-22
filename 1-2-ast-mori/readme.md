[通过写Babel插件理解抽象语法树（翻译）](https://www.jianshu.com/p/3c495dcbed49) 
原文：https://www.sitepoint.com/understanding-asts-building-babel-plugin/
今天，我们将看下如何写Bable插件为JavaScript添加默认的不可变数据。这个教程的代码可以从 [GitHub仓库](https://github.com/sitepoint-editors/moriscript?spm=a2c6h.12873639.article-detail.8.20ae2384C1u3iA)下载。

我们希望设计允许我们把普通的对象和数组字面量通过使用**Mori**转换为不可变的数据结构的插件。

```
node run.js test/case.ms
```
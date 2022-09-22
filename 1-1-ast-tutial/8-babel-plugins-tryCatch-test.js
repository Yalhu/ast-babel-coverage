const babel = require('@babel/core')
// babel-loader   : test:/\.[tj]sx?/
const code = `
    async function Async1() {
      await fetch();
    }
    async function Async2() {
      const { data } = await fetch();
      return data;
    }
    const Async3 = async function () {
      const { code } = await fetch();
      return code;
    }`
console.log(babel.transform(code).code);

/*
// ===== 输出 ======
async function Async1() {
  try {
    await fetch();
  } catch (err) {
    console.error(err);
  }
}
async function Async2() {
  try {
    const {
      data
    } = await fetch();
    return data;
  } catch (err) {
       console.error(err);
  }
}
const Async3 = async function () {
  try {
    const {
      code
    } = await fetch();
    return code;
  } catch (err) {
    console.error(err);
  }
};

*/

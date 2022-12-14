var mori = require('mori');

var foo = { bar: 1, baz: 2 };
var qux = foo.bar = 2;
var zuq = foo.bar;

var zig = [1, 2, 3];
var zag = zig[0] = 3;
var zog = zig[1];

console.log(foo, qux);

/*
// ======= 转换后 输出 =========
var mori = require('mori');

var foo = mori.hashMap("bar", 1, "baz", 2);
var qux = mori.assoc(foo, "bar", 2);
var zuq = mori.get(foo, "bar");
var zig = mori.vector(1, 2, 3);
var zag = mori.assoc(zig, 0, 3);
var zog = mori.get(zig, 1);
console.log(mori.toJs(foo), mori.toJs(qux));

*/
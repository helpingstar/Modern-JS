// 07-06
var x = '1';

console.log(typeof x); // string
console.log(typeof +x); // number

x = true;
console.log(typeof x); // boolean
console.log(typeof +x); // number

x = 'Hello';
console.log(typeof x); // string
console.log(typeof +x); // number
console.log(+x); // NaN

x = undefined;
console.log(typeof x); // undefined
// 09-31-01

var foo = '' || 'default string';
console.log(foo); // default string

var foo = '' ?? 'default string';
console.log(foo); // ''

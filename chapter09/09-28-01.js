// 09-28-01

var str = '';

var length = str && str.length;
console.log(length); // ''

var length = str?.length;
console.log(length); // 0

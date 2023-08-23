// 07-21-01

var x = 2, result;

var result = x % 2 ? '홀수' : '짝수';
console.log(result); // 짝수

if (x % 2) result = '홀수';
else       result = '짝수';
console.log(result); // 짝수
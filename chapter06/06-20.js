// 06-20
var key = Symbol('key');
console.log(typeof key); // symbol
console.log(key.toString()); // Symbol(key)

// 객체 생성
var obj = {};

// 이름이 충돌할 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용한다.
obj[key] = 'value';
console.log(obj[key]); // value
console.log(obj.key); // undefined
console.log(obj['key']); // undefined

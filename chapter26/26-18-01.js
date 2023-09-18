// 26-18-01

const create1 = (id, content) => ({ id, content });

// 위 표현은 다음과 동일하다.
const create2 = (id, content) => { return { id, content }; };

console.log(create1(1, 'My number is 1'));
console.log(create2(2, 'My number is 2'));
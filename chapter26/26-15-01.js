// 26-15-01

// concise body
const power1 = x => x ** 2;

// 위 표현은 다음과 동일하다.
// block body
const power2 = x => { return x ** 2; };

console.log(power1(2)); // 4
console.log(power2(2)); // 4
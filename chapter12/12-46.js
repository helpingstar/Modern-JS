// 12-46

// 함수 표현식
var factorial = function foo(n) {
    if (n <= 1) return 1;
    return n * foo(n - 1);
};

console.log(factorial(5)); // 120

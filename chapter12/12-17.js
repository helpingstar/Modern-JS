// 12-17

function add(x, y) {
    console.log(x, y);
    return x + y;
}

add(2, 5); // 2 5

// add 함수의 매개변수 x, y는 함수 몸체 내부에서만 참조할 수 있다.
console.log(x, y); // ReferenceError: x is not defined

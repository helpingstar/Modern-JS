// 13-05

function bar() {
    let x = 1;
    // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언이 허용되지 않는다.
    let x = 2; // SyntaxError: Identifier 'x' has already been declared
}
bar();

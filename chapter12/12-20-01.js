// 12-20-01

function add(x, y) {
    console.log(arguments);
    // Arguments(3) [2, 5, 10, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    console.log(arguments[2]); // 10
    return x + y;
}

add(2, 5, 10);

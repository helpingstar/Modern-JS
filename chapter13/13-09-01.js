// 13-09-01

var x = 1;

function foo() {
    var x = 10;
    function bar() {
        console.log(x);
    }
    bar();
}

foo(); // 10

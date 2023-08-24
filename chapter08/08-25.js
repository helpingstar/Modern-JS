// 08-25

var string = "Hello World"
var search = "l"
var count = 0;

// continue 문을 사용하지 않으면 if 문 내에 코드를 작성해야 한다.
for (var i = 0; i < string.length; i++) {
    if (string[i] === search) {
        count++;
    }
}

console.log(count); // 3

var count = 0;
// continue 문을 사용하면 if 문 밖에 코드를 작성할 수 있다.
for (var i = 0; i < string.length; i++) {
    if (string[i] !== search) continue;
    count++;
}

console.log(count); // 3

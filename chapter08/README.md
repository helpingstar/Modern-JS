# Chapter08 제어문

조건에 따라 코드 블록을 실행하거나 반복 실행할 때 사용한다.

## 블록문

0개 이상의 문을 중괄호로 묶은 것으로 코드 블록 또는 블록이라고 부르기도 한다. 블록문은 자체 종결성을 갖기 때문에 끝에 세미콜론을 붙이지 않는다.

```js
// 08-01

// 블록문
{
    var foo = 10;
}

// 제어문
var x = 0;
if (x < 10) {
    x++;
}

// 함수 선언문
function sum(a, b) {
    return a + b;
}
```

## 조건문

조건식의 평가 결과에 따라 코드 블록의 실행을 결정한다.

### `if ... else` 문

```js
if (조건식) {
    // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
    // 조건식이 거짓이면 이 코드 블록이 실행된다.
}
```

조건식이 불리언 값이 아닌 값으로 평가되면 불리언 값으로 암묵적 타입 변환이 수행된다.

```js
if (조건식1) {
    // 조건식 1이 참이면 이 코드 블록이 실행된다.
} else if (조건식 2) {
    // 조건식 2가 참이면 이 코드 블록이 실행된다.
} else {
    // 조건식 1과 조건식 2가 모두 거짓이면 이 코드 블록이 실행된다.
}
```

코드 블록 내의 문이 하나 뿐이라면 중괄호를 생략할 수 있다.

```js
// 08-03

var num = 2;
var kind;

if (num > 0)        kind = '양수';
else if (num < 0)   kind = '음수';
else                kind = '영';

console.log(kind); // 양수
```

삼항 조건 연산자는 값으로 평가되는 표현식을 만들기 때문에 변수에 할당할 수 있다. 하지만 `if ... else` 문은 표현식이 아닌 문이기 때문에 변수에 할당할 수 없다.

### switch 문

주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 `case` 문으로 실행 흐름을 옮긴다. `case` 문은 상황을 의미하는 표현식을 지칭하고 콜론으로 마친다. 그리고 그 뒤에 실행할 문들을 위치시킨다.

`switch` 문의 표현식과 일치하는 `case` 문이 없다면 실행 순서는 `default` 문으로 이동한다. `default` 문은 선택사항으로, 사용할 수도 있고 사용하지 않을 수도 있다.

```js
switch (표현식) {
    case 표현식1:
        // switch 문의 표현식과 표현식1이 일치하면 실행될 문
        break;
    case 표현식2:
        // switch 문의 표현식과 표현식2가 일치하면 실행될 문
        break;
    default:
        // switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문
}
```

```js
// 08-07

var month = 11;
var monthName;

switch (month) {
    case 1: monthName = 'Jan';
    case 2: monthName = 'Feb';
    case 3: monthName = 'Mar';
    case 4: monthName = 'Apr';
    case 5: monthName = 'May';
    case 6: monthName = 'Jun';
    case 7: monthName = 'Jul';
    case 8: monthName = 'Aug';
    case 9: monthName = 'Sep';
    case 10: monthName = 'Oct';
    case 11: monthName = 'Nov';
    case 12: monthName = 'Dec';
    default: monthName = 'Invalid month';
}

console.log(monthName); // Invalid month
```

`switch` 문의 표현식의 평가 결과와 일치하는 `case`문으로 실행 흐름이 이동하여 실행하지만 문을 실행 후 `switch`문을 탈출하지 않고 이후의 모든 `case`문과 `default`문을 실행한다.

이러한 결과가 나온 이유는 `case`문에 해당하는 문의 마지막에 `break` 문을 사용하지 않았기 때문이다. `break` 키워드로 구성된 `break` 문은 코드 블록에서 탈출하는 역할을 한다.

```js
// 08-08

// 월을 영어로 변환한다. (11 -> 'Nov')
var month = 11;
var monthName;

switch (month) {
    case 1: monthName = 'Jan'; break;
    case 2: monthName = 'Feb'; break;
    case 3: monthName = 'Mar'; break;
    case 4: monthName = 'Apr'; break;
    case 5: monthName = 'May'; break;
    case 6: monthName = 'Jun'; break;
    case 7: monthName = 'Jul'; break;
    case 8: monthName = 'Aug'; break;
    case 9: monthName = 'Sep'; break;
    case 10: monthName = 'Oct'; break;
    case 11: monthName = 'Nov'; break;
    case 12: monthName = 'Dec'; break;
    default: monthName = 'Invalid month';
}

console.log(monthName); // Nov
```

`default` 문은 맨 마지막에 위치하므로 별도로 `break` 문이 필요 없다.

다음 예제와 같이 여러 개의 `case` 문을 하나의 조건으로 사용할 수도 있다.

```js
// 08-09

var year = 2000; // 2000년은 윤년으로 2월이 29일이다.
var month = 2;
var days = 0;

switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        days = 31;
        break;
    case 4: case 6: case 9: case 11:
        days = 30;
        break;
    case 2:
        // 윤년 계산 알고리즘
        // 1. 연도가 4로 나누어 떨어지는 해는 윤년이다.
        // 2. 연도가 4로 나누어 떨어지더라도 100으로 나누어 떨어지는 해는 윤년이 아니다.
        // 3. 연도가 400으로 나누어 떨어지는 해는 윤년이다.
        days = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28;
        break;
    default:
        console.log('Invalid month');
}

console.log(days); // 29
```

## 반복문

조건식의 평가 결과가 참인 경우 코드 블록을 실행한다. 그 후 조건식을 다시 평가하여 여전히 참인 경우 코드 블록을 다시 실행한다. 이는 조건이 거짓일 때까지 반복된다.

### `for` 문

조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다.

```js
for(변수 선언문 또는 할당문; 조건식; 증감식) {
    // 조건식이 참인 경우 반복 실행될 문;
}
```

```js
// 08-12

// 무한 루프
for (; ;) {
    // ...
}
```

### `while` 문

주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다.

* `for` : 반복 횟수가 명확할 때 주로 사용
* `while` : 반복 횟수가 불명확할 때 주로 사용

`while` 문은 조건문의 평가 결과가 거짓이 되면 코드 블록을 실행하지 않고 종료한다. 조건식의 평가 결과가 불리언 값이 아니면 불리언 값으로 강제 변환하여 논리적 참, 거짓을 구별한다.

```js
while (조건식) {
    // 조건식이 참인 경우 반복 실행될 문;
}
```

```js
// 08-15

// 무한 루프
while (true) {
    // ...
}
```

코드 내에 `if` 문으로 탈출 조건을 만들고 `break` 문으로 코드 블록을 탈출한다.

```js
// 08-16

var count = 0;

// 무한 루프
while (true) {
    console.log(count);
    count++;
    // count가 3이면 코드 실행을 중단한다.
    if (count === 3) break;
} // 0 1 2
```

### `do ... while` 문

코드 블록을 먼저 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한 번 이상 실행된다.


```js
// 08-17-01

var count = 5;

do {
    console.log(count);
    count++;
} while (count < 3); // 5
```

### `break` 문

`break` 문은 레이블 문, 반복문, 또는 `switch` 문의 코드 블록을 탈출한다. 이 외에는 `SyntaxError` (문법 에러)가 발생한다.

레이블 문: 식별자가 붙은 문

```js
// 08-20

// foo라는 식별자가 붙은 레이블 블록문
foo: {
    console.log(1);
    break foo;
    console.log(2);
}

console.log('Done!');

// [OUTPUT]
// 1
// Done!
```

중첩도니 `for` 문의 내부 `for` 문에서 `break` 문을 실행하면 내부 `for` 문을 탈출하여 외부 `for` 문으로 진입한다. 이때 외부 `for` 문을 탈출하려면 레이블 문을 사용한다.

```js
// 08-21

// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
        if (i + j === 3) {
            break outer;
        }
        console.log(`inner [${i}, ${j}]`);
    }
}

console.log('Done!')
```

가독성이 나빠지고 오류발생 가능성이 높아지니 권장하지 않는다.

## `continue` 문

반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다.

`if` 문에서 실행해야 할 코드가 길다면 들여쓰기가 깊어지므로 `continue` 문을 사용하는 편이 가독성이 더 좋다.

```js
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
```

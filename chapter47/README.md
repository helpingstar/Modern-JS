# chatper47 에러 처리

## 에러 처리의 필요성

`try...catch` 문을 사용해 발생한 에러에 적절하게 대응하면 프로그램이 강제 종료되지 않고 계속해서 코드를 실행시킬 수 있다.

```js
// 47-01

console.log('[Start]');

foo(); // ReferenceError: foo is not defined
// 발생한 에러를 방치하면 프로그램은 강제 종료된다.

// 에러에 의해 프로그램이 강제 종료되어 아래 코드는 실행되지 않는다.
console.log('[End]');
```

직접적인 에러를 발생하지 않는 예외(exception)적인 상황이 발생할 수도 있다. 예외적인 상황에 적절하게 대응하지 않으면 에러로 이어질 가능성이 크다.

```js
// 47-03

// DOM에 button 요소가 존재하지 않으면 querySelector 메서드는 에러를 발생시키지 않고 null을 반환한다.
const $button = document.querySelector('button'); // null

$button.classList.add('disabled');
// TypeError: Cannot read property 'classList' of null
```

위 예제의 `querySelector` 메서드는 인수로 전달한 문자열이 CSS 선택자 문법에 맞지 않는 경우 에러를 발생시킨다.

```js
// 47-04

const $elem = document.querySelector('#1');
// DOMException: Failed to execute 'querySelector' on 'Document': '#1' is not a valid selector.
```

하지만 `querySelector` 메서드는 인수로 전달한 CSS 선택자 문자열로 DOM에서 요소 노드를 찾을 수 없는 경우 에러를 발생시키지 않고 `null`을 반환한다. 이때 `if` 문으로 `querySelector`  메서드의 반환값을 확인하거나 단축 평가 또는 옵셔널 체이닝 연산자 `?.`를 사용하지 않으면 다음 처리에서 에러로 이어질 가능성이 크다.

```js
// DOM에 button 요소가 존재하는 경우 querySelector 메서드는 에러를 발생시키지 않고 null을 반환한다.
const $button = document.querySelector('button'); // null
$button?.classList.add('disabled');
```

이처럼 에러나 예외적인 상황에 대응하지 않으면 프로그램은 강제 종료될 것이다.

## try ... catch ... finally 문

기본적으로 에러 처리를 구현하는 방법은 크게 두 가지가 있다.
* 에외적인 상황이 발생하면 반환하는 값(`null` or `-1`)을 `if` 문이나 단축 평가 또는 옵셔널 체이닝 연산자를 통해 확인해서 처리
* 에러 처리 코드를 미리 등록해 두고 에러가 발생하면 에러 처리 코드로 점프
  * `try ... catch ... finally`

`try...catch...finally` 문은 3개의 코드 블록으로 구성된다.

```js
try {
    // 실행할 코드(에러가 발생할 가능성이 있는 코드)
} catch (err) {
    // try 코드 블록에서 에러가 발생하면 이 코드 블록의 코드가 실행된다.
    // err에는 try 코드 블록에서 발생한 Error 객체가 전달된다.
} finally {
    // 에러 발생과 상관없이 반드시 한 번 실행된다. (쌩략 가능)
}
```

1. `try ... catch ... finally` 문 실행
2. `try` 코드 블록 실행.
3. `try` 코드 블록에 포함된 문 중에서 에러가 발생하면 발생한 에러는 `catch` 문의 `err` 변수에 전달되고 `catch` 코드 블록이 실행된다.
4. `catch` 문의 `err` 변수(이름은 상관없다)는 `try` 코드 블록에 포함된 문 중에서 에러가 발생하면 생성되고 `catch` 코드 블록에서만 유효하다.
5. `finally` 코드 블록은 에러 발생과 상관없이 반드시 한 번 실행된다.


`try...catch...finally` 문으로 에러를 처리하면 프로그램이 강제 종료되지 않는다.

```js
// 47-06

console.log('[Start]');

try {
    // 실행할 코드(에러가 발생할 가능성이 있는 코드)
    foo();
} catch (err) {
    // try 코드 블록에서 에러가 발생하면 이 코드 블록의 코드가 실행된다.
    // err에는 try 코드 블록에서 발생한 Error 객체가 전달된다.
    console.error(err); // ReferenceError: foo is not defined
} finally {
    // 에러 발생과 상관없이 반드시 한 번 실행된다.
    console.log('finally');
}

// try...catch...finally 문으로 에러를 처리하면 프로그램이 강제 종료되지 않는다.
console.log('[End]');
```

## Error 객체

`Error` 생성자 함수는 에러 객체를 생성한다. `Error` 생성자 함수에는 에러를 상세히 설명하는 에러 메시지를 인수로 전달할 수 있다.

```js
// 47-07

const error = new Error('invalid');
```

`Error` 생성자 함수가 생성한 에러 객체는 `message` 프로퍼티와 `stack` 프로퍼티를 갖는다. `message` 프로퍼티의 값은 `Error` 생성자 함수에 인수로 전달한 에러 메시지이고, `stack` 프로퍼티의 값은 에러를 발생시킨 콜스택의 호출 정보를 나타내는 문자열이며 디버깅 목적으로 사용한다.

SyntaxError, TypeError, RangeError, URIERror, EvalError 생성자 함수가 생성한 에러 객체의 프로토타입은 모두 `Error.prototype`을 상속받는다.

| 생성자 함수 | 인스턴스 |
| --- | --- |
| Error | 일반적 에러 객체 |
| SyntaxError | 자바스크립트 문법에 맞지 않는 문을 해석할 때 발생하는 에러 객체 |
| TypeError | 참조할 수 없는 식별자를 참조했을 때 발생하는 에러 객체 |
| RangeError | 숫자값의 허용 범위를 벗어났을 때 발생하는 에러 객체 |
| URIERror | `encodeURI` 또는 `decodeURI` 함수에 부적절한 인수를 전달했을 때 발생하는 에러 객체 |
| EvalError | `eval` 함수에서 발생하는 에러 객체 |

```js
// 47-08

1 @ 1;    // SyntaxError: Invalid or unexpected token
foo();    // ReferenceError: foo is not defined
null.foo; // TypeError: Cannot read property 'foo' of null
new Array(-1); // RangeError: Invalid array length
decodeURIComponent('%'); // URIError: URI malformed
```

## throw 문

에러를 발생시키려면 `try` 코드 블록에서 `throw` 문으로 에러 객체를 던져야 한다.

```js
throw 표현식
```

`throw` 문의 표현식은 어떤 값이라도 상관없지만 일반적으로 에러 객체를 지정한다. 에러를 던지면 `catch` 문의 에러 변수가 생성되고 던져진 에러 객체가 할당된다. 그리고 `catch` 코드 블록이 실행되기 시작한다.

```js
// 47-10

try {
    // 에러 객체를 던지면 catch 코드 블록이 실행되기 시작한다.
    throw new Error('something wrong');
} catch (error) {
    console.log(error);
}
```

ex. 외부에서 전달받은 콜백 함수를 n번만큼 반복 호출하는 `repeat` 함수

`repeat` 함수는 두 번째 인수로 반드시 콜백 함수를 전달받아야 한다. 만약 두 번째 인수가 함수가 아니면 `TypeError`를 발생시키자. `repeat` 함수는 에러를 발생시킬 가능성이 있으므로 `try` 코드 블록 내부에서 호출해야 한다.

```js
// 47-11

// 외부에서 전달받은 콜백 함수를 n번만큼 반복 호출한다
const repeat = (n, f) => {
    // 매개변수 f에 전달된 인수가 함수가 아니면 TypeError를 발생시킨다.
    if (typeof f !== 'function') throw new TypeError('f must be a function');

    for (var i = 0; i < n; i++) {
        f(i); // i를 전달하면서 f를 호출
    }
};

try {
    repeat(2, 1); // 두 번째 인수가 함수가 아니므로 TypeError가 발생(throw)한다.
} catch (err) {
    console.error(err); // TypeError: f must be a function
}
```

## 에러의 전파

에러는 호출자 방향으로 전파된다. 즉 콜 스택의 아래 방향으로 전파된다.

```js
// 47-12

const foo = () => {
    throw Error('foo에서 발생한 에러'); // ④
};

const bar = () => {
    foo(); // ③
};

const baz = () => {
    bar(); // ②
};

try {
    baz(); // ①
} catch (err) {
    console.error(err);
}
```

%1%에서 `baz` 함수를 호출하면 %2%에서 `bar` 함수가 호출되고 %3%에서 `foo` 함수가 호출되고 `foo` 함수는 %4%에서 에러를 `throw` 한다. 이때 `foo` 함수가 `throw`한 에러는 다음과 같이 호출자에게 전파되어 전역에서 캐치된다.

![47-01](../images/47-01.jpg)

이처럼 `throw`된 에러를 캐치하지 않으면 호출자 방향으로 전파된다. 이때 `throw`된 에러를 캐치하여 적절히 대응하면 프로그램을 강제 종료시키지 않고 코드 실행 흐름을 복구할 수 있다. `throw`된 에러를 어디에서도 캐치하지 않으면 프로그램은 강제 종료된다.

주의할 것은 비동기 함수인 `setTimeout`이나 프로미스 후속 처리 메서드의 콜백 함수는 호출자가 없다는 것이다. `setTimeout`이나 프로미스 후속 처리 메서드의 콜백 함수는 태스크 큐나 마이크로 태스크 큐에 일시 저장되었다가 콜 스택이 비면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다. 이때 콜 스택에 푸시된 콜백 함수의 실행 컨텍스트는 콜 스택의 가장 하부에 존재하게 된다. 따라서 에러를 전파할 호출자가 존재하지 않는다.
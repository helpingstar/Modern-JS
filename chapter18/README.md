# chapter18 함수와 일급 객체

## 일급 객체

다음과 같은 조건을 만족하는 객체를 일급 객체라 한다.

1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

자바스크립트의 함수는 위의 조건을 모두 만족하므로 일급 객체다. 함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미이다.

일반 객체는 호출할 수 없지만 함수 객체는 호출할 수 있다. 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.

## 함수 객체의 프로퍼티

```js
// 18-02

function square(number) {
    return number * number;
}

console.dir(square);
```

```text
ƒ square(number)
    arguments: null
    caller: null
    length: 1
    name: "square"
    prototype: {constructor: ƒ}
    [[FunctionLocation]]: VM293:3
    [[Prototype]]: ƒ ()
    [[Scopes]]: Scopes[1]
```

`square` 함수의 모든 프로퍼티 어트리뷰트를 `Object.getOwnPropertyDescriptors` 메서드로 확인해보면 다음과 같다.

```js
// 18-03

function square(number) {
    return number * number;
}

console.log(Object.getOwnPropertyDescriptors(square));
/*
{
    length : { value: 1, writable: false, enumerable: false, configurable: true },
    name : { value: "square", writable: false, enumerable: false, configurable: true },
    arguments: { value: null, writable: false, enumerable: false, configurable: false },
    caller: { value: null, writable: false, enumerable: false, configurable: false },
    prototype: { value: {…}, writable: true, enumerable: false, configurable: false }
}
*/

// __proto__는 square 함수의 프로퍼티가 아니다.
console.log(Object.getOwnPropertyDescriptors(square, '__proto__')); // undefined

// __proto__는 Object.prototype 객체의 접근자 프로퍼티다.
// square 함수는 Object.prototype 객체로부터 __proto__ 접근자 프로퍼티를 상속받는다.
console.log(Object.getOwnPropertyDescriptors(Object.prototype, '__proto__'));
// {configurable: true, enumerable: false, get: ƒ, set: ƒ }
```

### `arguments` 프로퍼티

함수 호출시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체, 함수 내부에서 지역 변수처럼 사용된다.

함수의 모든 인수는 `arguments` 객체의 프로퍼티로 보관된다.

`arguments` 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.

```js
// 18-06

function sum() {
    let res = 0;

    // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
    for (let i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }

    return res;
}

console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

ES6부터 `arguments` 객체는 실제 배열이 아닌 유사 배열 객체이면서 동시에 이터러블이다. 배열 메서드는 사용 불가하며 사용하려면 간접 호출해야 하는 번거로움이 있다.

```js
// 18-07
function sum() {
    // arguments 객체를 배열로 변환
    const array = Array.prototype.slice.call(arguments);
    return array.reduce(function (pre, cur) {
        return pre + cur;
    }, 0);
}

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

이러한 번거로움을 해결하기 위해 ES6 에서는 Rest 파라미터를 도입했다.

```js
// 18-08

// ES6 Rest parameter
function sum(...args) {
    return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```
### `length` 프로퍼티

함수 객체의 `length` 프로퍼티는 함수를 정의할 때 선언한 매개변수 개수를 가리킨다.

* `arguments` 객체의 `length` 프로퍼티 : 인자의 개수
* 함수 객체의 `length` 프로퍼티 : 매개변수의 개수

### `name` 프로퍼티

함수 이름을 나타낸다.

익명 함수 표현식의 경우 ES5 에서 `name` 프로퍼티는 빈 문자열이지만 ES6에서는 함수 객체를 가리키는 식별자를 값으로 갖는다.

```js
// 18-11

// 기명 함수 표현식
var namedFunc = function foo() { };
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function () { };
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() { }
console.log(bar.name); // bar
```

### `__proto__` 접근자 프로퍼티

모든 객체는 `[[Prototype]]` 이라는 내부 슬롯을 갖는데, 이것은 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.

`__proto__` 프로퍼티는 `[[Prototype]]` 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다. 직접 접근할 수 없고 간접적인 접근 방법으로 접근할 수 있다. 

```js
// 18-12

const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
// hasOwnProperty 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('__proto__')); // false
```

### `prototype` 프로퍼티

생성자 함수로 호출할 수 있는 함수 객체인 constructor 만이 소유하는 프로퍼티다. non-constructor에는 `prototype` 프로퍼티가 없다. `prototype` 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.

```js
// 18-13

// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log((function () { }).hasOwnProperty('prototype')); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
console.log(({}).hasOwnProperty('prototype')); // false
```
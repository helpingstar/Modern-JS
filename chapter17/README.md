# chapter17 생성자 함수에 의한 객체 생성

## `Object` 생성자 함수

`new` 연산자와 함께 `Object` 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체를 생성한 이후로 프로퍼티 또는 메서드를 추가하여 객체를 완성할 수 있다.

```js
// 17-01

const person = new Object();

// 프로퍼티 추가
person.name = 'Lee';
person.sayHello = function () {
    console.log('Hi! My name is ' + this.name);
};

console.log(person); // {name: "Lee", sayHello: ƒ}
person.sayHello(); // Hi! My name is Lee
```

생성자 함수란 `new` 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다. 생성자 함수에 의해 생성된 객체를 인스턴스라 한다.

자바스크립트는 `Object` 생성자 함수 이외에도 `String`, `Number`, `Boolean`, `Function`, `Array`, `Date`, `RegExp`, `Promise` 등의 빌트인 생성자 함수를 제공한다.

```js
// 17-02

// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee');
console.log(typeof strObj); // object
console.log(strObj); // String {"Lee"}

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123);
console.log(typeof numObj); // object
console.log(numObj); // Number {123}

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj = new Boolean(true);
console.log(typeof boolObj); // object
console.log(boolObj); // Boolean {true}

// Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function('x', 'return x * x');
console.log(typeof func); // function
console.dir(func); // ƒ anonymous(x)

// Array 생성자 함수에 의한 Array 객체(배열) 생성
const arr = new Array(1, 2, 3);
console.log(typeof arr); // object
console.log(arr); // [1, 2, 3]

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp); // object
console.log(regExp); // /ab+c/i

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date();
console.log(typeof date); // object
console.log(date); // Mon Sep 04 2023 10:14:14 GMT+0900 (한국 표준시)
```

## 생성자 함수

### 객체 리터럴에 의한 객체 생성 방식의 문제점

객체 리터럴에 의한 객체 생성 방식은 단 하나의 객체만 생성하며 여러 개 생성시 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적이다.

```js
// 17-03

const circle1 = {
    radius: 5,
    getDiameter() {
        return 2 * this.radius;
    }
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
    radius: 10,
    getDiameter() {
        return 2 * this.radius;
    }
};

console.log(circle2.getDiameter()); // 20
```

### 생성자 함수에 의한 객체 생성 방식의 장점

객체를 생성하기 위한 템플릿처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체를 간편하게 생성할 수 있다.

```js
// 17-04

// 생성자 함수
function Circle(radius) {
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

// 인스턴스의 생성
const circle1 = new Circle(5); // 반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

#### this

객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수, `this` 바인딩은 호출 방식에 따라 동적으로 결정된다

| 함수 호출 방식 | `this`가 가리키는 값(`this` 바인딩) |
| - | - |
| 일반 함수로서 호출 | 전역 객체 |
| 메서드로서 호출 | 메서드를 호출한 객체(마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 (미래에) 생성할 인스턴스 |

---

생성자 함수는 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 `new` 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다. 그렇지 않으면 일반 함수로 동작한다.

```js
// 17-06

// 생성자 함수
function Circle(radius) {
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다.
// 즉, 일반 함수로서 호출된다.
const circle = Circle(15);

// 일반 함수로서 호출된 Circle은 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle); // undefined

// 일반 함수로서 호출된 Circle 내의 this는 전역 객체를 가리킨다.
console.log(radius); // 15
```

### 생성자 함수의 인스턴스 생성 과정

생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿으로 동작하여 인스턴스를 생성(필수)하는 것과 생성된 인스턴스를 초기화(옵션) 하는 것이다.

`new` 연산자와 함께 생성자 함수를 호출하면 자바스크립트 엔진은 암묵적인 처리를 통해 인스턴스를 생성하고 초기화 후 반환한다.

```js
// 17-07

// 생성자 함수
function Circle(radius) {
    // 인스턴스 초기화
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

// 인스턴스의 생성
const circle1 = new Circle(5); // 반지름이 5인 Circle 객체를 생성
```

#### 인스턴스 생성과 `this` 바인딩

1. 암묵적 빈 객체 생성(인스턴스)
2. 인스턴스가 `this`에 바인딩됨

이 처리는 런타임 이전에 실행된다.

#### 인스턴스 초기화

1. 생성자 함수의 코드가 한 줄씩 실행
2. `this`에 바인딩되어 있는 인스턴스 초기화
   * `this`에 바인딩 되어 있는 인스턴스에 프로퍼티나 메서드 추가.
   * 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값 할당


#### 인스턴스 반환

생성자 함수 내부의 모든 처리가 끝나면 완성된 `this`가 암묵적으로 반환된다.

```js
// 17-10

function Circle(radius) {
    // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩된다.

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };

    // 3. 완성된 디스턴스가 바인딩된 this가 암묵적으로 반환된다.
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
const circle = new Circle(1);
console.log(circle); // Circle { radius: 1, getDiameter: [Function (anonymous)] }
```

만약 `this`가 아닌 다른 객체를 명시적으로 반환하면 `this`가 반환되지 못하고 `return` 문에 명시한 객체가 반환된다.

하지만 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 `this`가 반환된다.

```js
// 17-12

function Circle(radius) {
    // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩된다.

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };

    // 3. 완성된 디스턴스가 바인딩된 this가 암묵적으로 반환된다.
    // 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환된다.
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
const circle = new Circle(1);
console.log(circle); // Circle { radius: 1, getDiameter: [Function (anonymous)] }
```

명시적으로 `this`가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본 동작을 훼손하므로 생성자 함수 내부에서 `return` 문을 반드시 생략해야 한다.

### 내부 메서드 `[[Call]]` 과 `[[Construct]]`

함수 선언문 또는 함수 표현식으로 정의한 함수는 일반적인 함수로서 호출할 수 있는 것은 물론 `new` 연산자와 함께 호출(생성자 함수로서 호출)할 수 있다.

함수는 객체이므로 일반 객체와 동일하게 내부 슬롯과 내부 메서드를 가진다.

```js
// 17-13

// 함수는 객체다
function foo() { }

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
foo.prop = 10;

// 함수는 객체이므로 메서드를 소유할 수 있다.
foo.method = function () {
    console.log(this.prop);
};

foo.method(); // 10
```

하지만 일반 객체와 달리 함수는 호출할 수 있다. 따라서 함수 객체는 함수로서 동작하기 위해 함수 객체만을 위한 `[[Environment]]`, `[[FormalParameters]]` 등의 내부 슬롯과 `[[Call]]`, `[[Construct]]` 같은 내부 메서드를 추가로 가지고 있다.

함수는 일반 함수로서 호출되면 함수 객체의 내부 메서드`[[Call]]` 이 호출되고 `new` 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 `[[Construct]]` 가 호출된다.

```js
// 17-14

function foo() { }

// 일반적인 함수로서 호출: [[Call]]이 호출된다.
foo();

// 생성자 함수로서 호출: [[Construct]]가 호출된다.
new foo();
```

* 호출할 수 있는 객체(callable) : `[[Call]]`
* 생성자 함수로서 호출할 수 있는 함수(constructor) : `[[Construct]]`
  * <-> 생성자 함수로서 호출할 수 없는 함수(non-constructor)

함수 객체는 callable 이면서 constructor이거나 callable이면서 non-constructor다.

### constructor와 non-constructor의 구분

자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 평가할 때 함수 정의 방식에 따라 함수를 constructor와 non-constructor로 구분한다.

* constructor : 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
* non-constructor : 메서드(ES6 메서드 축약 표현), 화살표 함수

ECMAScript 사양에서 메서드로 인정하는 범위가 일반적인 의미의 메서드보다 좁다.

```js
// 17-15

// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() { }
const bar = function () { };
// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
const baz = {
    x: function () { }
};

// 일반 함수로 정의된 함수만이 constructor이다.
new foo(); // foo {}
new bar(); // bar {}
new baz.x(); // x {}

// 화살표 함수 정의
const arrow = () => { };

new arrow(); // TypeError: arrow is not a constructor

// 메서드 정의: ES6의 메서드 축약 표현만 메서드로 인정한다.
const obj = {
    x() { }
};

new obj.x(); // TypeError: obj.x is not a constructor
```

ECMAScript 사양에서 메서드란 ES6의 메서드 축약 표현만을 의미한다. 함수 정의 방식에 따라 constructor와 non-constructor를 구분한다.

* constructor : 일반 함수 선언문, 함수 표현식
* non-constructor : 화살표 함수, 메서드 축약 표현

함수를 일반 함수로 호출 -> `[[Call]]` 호출

`new` 연산자와 함께 생성자 함수로서 호출 -> `[[Construct]]` 호출

non-constructor인 함수 객체를 생성자 함수로서 호출하면 에러가 발생한다. callable이면서 constructor에 `new` 연산자를 붙여 호출하면 생성자 함수처럼 동작할 수 있다(주의).

### new 연산자

`new` 연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수(`[[Construct]]`)로 동작한다. `new` 연산자와 함께 호출하는 함수는 constructor 이어야 한다.

```js
// 17-17

// 생성자 함수로서 정의하지 않은 일반 함수
function add(x, y) {
    return x + y;
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
let inst = new add();

// 함수가 객체를 반환하지 않았으므로 반환문이 무시된다. 따라서 빈 객체가 생성되어 반환된다.
console.log(inst); // {}

// 객체를 반환하는 일반 함수
function createUser(name, role) {
    return { name, role };
}

// 일반 함수를 new 연산자와 함께 호출
inst = new createUser('Lee', 'admin');

// 함수가 생성한 객체를 반환한다.
console.log(inst); // { name: 'Lee', role: 'admin' }
```

`new` 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출(`[[Call]]`)된다.

```js
// 17-18

// 생성자 함수
function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

// new 연산자 없이 생성자 함수를 호출하면 일반 함수로서 호출된다.
const circle = Circle(5);
console.log(circle); // undefined

// 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter();
// TypeError: Cannot read property 'getDiameter' of undefined
```

1. `Circle` 함수를 `new` 연산자와 함께 생성자 함수로서 호출 
   * -> `this`는 `Circle` 생성자 함수가 생성할 인스턴스를 가리킴
2. `Circle` 함수를 일반 함수로서 호출
   * -> `this`는 전역 객체 `windows`를 가리킨다.
   * -> `radius` 프로퍼티와 `getDiameter` 메서드는 전역 스코프에 속한다.

생성자 함수는 일반적으로 첫 문자를 대문자로 기술(Pascal Case)하여 구별할 수 있도록 노력한다.

### `new.target`

`new.target` : `this`와 유사하게 constructor인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티라고 부른다(IE 지원 X)

함수 내부에서 `new.target`을 사용하면 `new` 연산자와 함께 생성자 함수로서 호출되었는 지 확인할 수 있다. 
* `new` 연산자와 함께 생성자 함수로서 호출 : 함수 내부의 `new.target`은 함수 자신을 가리킨다. 
* `new` 연산자와 없이 일반 함수로서 호출 : 함수 내부의 `new.target`은 `undefined`다.

함수 내부에서 `new.target`을 사용하여 `new` 연산자와 생성자 함수로서 호출했는지 확인하여 그렇지 않은 경우 `new` 연산자와 함꼐 재귀 호출을 통해 생성자 함수로서 호출할 수 있다.

```js
// 17-19

// 생성자 함수
function Circle(radius) {
    // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined다.
    if (!new.target) {
        // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다.
        return new Circle(radius);
    }
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

대부분의 빌트인 생성자 함수(`Object`, `String`, `Number`, `Boolean`, `Function`, `Array`, `Date`, `RegExp`, `Promise`)는 `new` 생성자와 함께 호출되었는지를 확인한 후 적절한 값을 반환한다.

`String` `Number`, `Boolean` 생성자 함수열
* `new` 연산자와 함께 호출: `String`, `Number`, `Boolean` 객체를 생성하여 반환하지만 
* `new` 연산자 없이 호출: 문자열, 숫자, 불리언 값을 반환. 이를 통해 데이터 타입을 변환하기도 한다.

```js
// 17-22

const str = String(123);
console.log(str, typeof str); // 123 string

const num = Number('123');
console.log(num, typeof num); // 123 number

const bool = Boolean('true');
console.log(bool, typeof bool); // true boolean
```
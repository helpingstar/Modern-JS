# chapter10 객체 리터럴

## 객체 값

원시 타입은 단 하나의 값만 나타내지만 객체 타입은 다양한 타입의 값을 하나의 단위로 구성한 복합적인 자료 구조다. 또한 변경 가능한 값이다.

객체는 0개 이상의 프로퍼티로 구성된 집합이며, 키(key)와 값(value)으로 구성된다.

```js
var person = {
// (프로퍼티 키) : (프로퍼티 값)
    name: 'Lee', // ┐
    age: 20      // ┴ 프로퍼티
}
```

함수도 일급 객체이므로 값으로 취급할 수 있다. 따라서 함수도 프로퍼티 값으로 사용할 수 있다. 프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메서드라 부른다.

```js
var counter = {
    num: 0,     // 프로퍼티
    increase: function() {  //  ┐
        this.num++;         //  ├ 메서드
    }                       //  ┘
}
```

* 프로퍼티 : 객체의 상태를 나타내는 값(data)
* 메서드 : 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작

## 객체 리터럴에 의한 객체 생성

클래스 기반 객체지향 언어는 클래스를 사전에 정의하고 필요한 시점에 `new` 연산자와 함께 생성자를 호출하여 인스턴스를 생성한다. 자바스크립트는 프로토타입 기반 객체지향 언어로써 다양한 객체 생성방법을 지원한다.

* 객체 리터럴
* `Object` 생성자 함수
* 생성자 함수
* `Object.create` 메서드
* 클래스(ES6)

가장 일반적이고 간단한 방법은 객체 리터럴을 사용하는 방법이다. 객체 리터럴은 중괄호 (`{...}`) 내에 0개 이상의 프로퍼티를 정의한다. 변수에 할당되는 시점에 자바스크립트 엔진은 객체 리터럴을 해석해 객체를 생성한다.

```js
// 10-01

var person = {
    name: 'Lee',
    sayHello: function () {
        console.log(`Hello! My name is ${this.name}.`);
    }
};

console.log(typeof person); // object
console.log(person); // {name: 'Lee', sayHello: ƒ}
```

중괄호 내에 프로퍼티를 정의하지 않으면 빈 객체가 생성되며 코드 블록을 의미하지 않는다. 코드 블록은 닫는 중괄호 뒤에 세미콜론을 붙이지 않는다. 객체 리터럴은 값으로 평가되는 표현식이므로 뒤에 세미콜론을 붙인다.

```js
// 10-02

var empty = {};
console.log(typeof empty); // object
```

## 프로퍼티

객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.

```js
// 10-03

var person = {
    // 프로퍼티 키는 name, 프로퍼티 값은 'Lee'
    name: 'Lee',
    // 프로퍼티 키는 age, 프로퍼티 값은 20
    age: 20
};
```

* **프로퍼티 키** : 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
* **프로퍼티 값** : 자바스크립트에서 사용할 수 있는 모든 값

식별자 네이밍 규칙을 따르지 않는 이름에는 따옴표를 사용해야 한다.

```js
// 10-04

var person = {
    firstName: "Ung-mo",  // 식별자 네이밍 규칙을 준수하는 프로퍼티 키
    'last-name': "Lee"    // 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키
};

console.log(person); // {firstName: "Ung-mo", last-name: "Lee"}
```

```js
// 10-05

var person = {
    fisrtName: "Ung-mo",
    last-name: "Lee" // SyntaxError: Unexpected token -
};
```

문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로피티 키를 동적으로 생성할 수 있다. 이 경우에는 프로퍼티 키로 사용할 표현식을 대괄호 (`[...]`)로 묶어야 한다.

```js
// 10-06

var obj = {};
var key = 'hello';

// ES5: 프로퍼티 키 동적 생성
obj[key] = 'world';
// ES6: 계산된 프로퍼티 이름
// var obj = { [key]: 'world' };

console.log(obj); // {hello: "world"}
```

빈 문자열, `var`, `function`과 같은 예약어을 프로퍼티 키로 사용해도 되나 권장하지 않는다.

프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다. 프로퍼티 키로 숫자 리터럴을 사용하면 내부적으로 문자열로 변환된다.

```js
// 10-08-01

var foo = {
    0: 1,
    1: 2,
    2: 3
}

console.log(foo); // {0: 1, 1: 2, 2: 3}

console.log(foo[0]);   // 1
console.log(foo["0"])  // 1
```

이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다.

## 메서드

함수는 값으로 취급할 수 있기 때문에 프로퍼티 값으로 사용할 수 있다. 프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라 부른다.

```js
// 10-11

var circle = {
    radius: 5, // <- 프로퍼티

    // 원의 지름
    getDiameter() { // <- 메서드
        return 2 * this.radius; // this는 circle을 가리킨다.
    }
};

console.log(circle.getDiameter()); // 10
```

### 프로퍼티 접근

프로퍼티에 접근하는 방법은 두 가지다.

* 마침표 표기법: (`.`)
* 대괄호 표기법: (`[...]`)

프로퍼티 키가 식별자 네이밍 규칙을 준수할 경우 두 표기법 모두 사용 가능하다.

```js
// 10-12

var person = {
    name: "Lee"
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name']); // Lee
```

대괄호 표기법을 사용할 경우 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다. 그렇지 않을 경우 식별자로 해석한다.

```js
// 10-13

var person = {
    name: "Lee"
};

console.log(person[name]); // ReferenceError: name is not defined
```

존재하지 않는 프로퍼티에 접근하면 `undefined`를 반환한다. `ReferenceError`가 발생하지 않는다.

```js
// 10-14

var person = {
    name: "Lee"
};

console.log(person.age); // undefined
```

프로퍼티 키가 네이밍 규칙을 준수하지 않는 이름일 경우 반드시 대괄호 표기법을 사용해야 한다. 단 숫자로 이루어진 문자열인 경우 따옴표를 생략할 수 있다.

```js
var person = {
  'last-name': 'Lee',
  1: 10
};

person.'last-name';  // -> SyntaxError: Unexpected string
person.last-name;    // -> 브라우저 환경: NaN
                     // -> Node.js 환경: ReferenceError: name is not defined
person[last-name];   // -> ReferenceError: last is not defined
person['last-name']; // -> Lee

// 프로퍼티 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수 있다.
person.1;     // -> SyntaxError: Unexpected number
person.'1';   // -> SyntaxError: Unexpected string
person[1];    // -> 10 : person[1] -> person['1']
person['1'];  // -> 10
```

`person.last-name`

* 자바스크립트 엔진 : `person.last` 평가
  1. `last`인 프로퍼티가 없기 때문에 `undefined`로 평가
  2. `undefined-name`
  3. `name` 이라는 식별자를 찾는다.
  4. 브라우저 환경에는 `name`이라는 전역변수(전역 객체 `window`의 프로퍼티)가 존재한다. 창(`window`)의 이름을 가리키며 기본값은 빈 문자열이다.
  5. `undefined-''`
  6. `NaN`
* Node.js : `name` 이라는 식별자 선언이 없으므로 `ReferenceError` 발생

## 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.

```js
// 10-17

var person = {
    name: "Lee",
};

person.age = 20;

console.log(person); // {name: "Lee", age: 20}
```

## 프로퍼티 삭제

`delete` 연산자는 객체의 프로퍼티를 삭제한다. 존재하지 않는 프로퍼티를 삭제하면 예외 없이 무시된다.

```js
// 10-18

var person = {
    name: "Lee"
};

person.age = 20;

delete person.age;
delete person.address;

console.log(person); // {name: "Lee"}
```

## ES6에서 추가된 객체 리터럴의 확장 기능

### 프로퍼티 축약 표현

프로퍼티 값으로 변수를 사용하는 경우 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있다. 이 때 프로퍼티 키는 변수 이름으로 자동 생성된다.

```js
// 10-19

// ES5
var x = 1, y = 2;

var obj = {
    x: x,
    y: y
};

console.log(obj); // {x: 1, y: 2}
```

```js
// 10-20

// ES6
let x = 1, y = 2;

// 프로퍼티 축약 표현
const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
```

### 계산된 프로퍼티 이름

문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다. 단, 대괄호 (`[...]`) 로 묶어야 한다.

```js
// 10-21

// ES5
var prefix = 'prop';
var i = 0;

var obj = {};

// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
// 객체 리터럴 외부에서 대괄호 표기법을 사용한다.
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

```js
// 10-22

// ES6
const prefix = 'prop';
let i = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
const obj = {
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

### 메서드 축약 표현

ES6에서는 메서드를 정의할 때 `function` 키워드를 생략한 축약표현을 사용할 수 있다. 이때 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다.

```js
// 10-23

// ES5
var obj = {
    name: 'Lee',
    sayHi: function () {
        console.log('Hi! ' + this.name);
    }
};

obj.sayHi(); // Hi! Lee
```

```js
// 10-24

const obj = {
    name: 'Lee',
    // 메서드 축약 표현
    sayHi() {
        console.log('Hi! ' + this.name);
    }
};

obj.sayHi(); // Hi! Lee
```

## 문제/질문

왜 ES6에서는 `const`를 쓸까

# chapter26 ES6 함수의 추가 기능

ES6 이전의 함수의 다양한 호출 형태

```js
// 26-01

var foo = function () {
    return 1;
};

// 일반적인 함수로서 호출
foo(); // -> 1

// 생성자 함수로서 호출
new foo(); // -> foo {}

// 메서드로서 호출
var obj = { foo: foo };
obj.foo(); // -> 1
```

ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있다. 즉 callable(`[[Call]]`) 이면서 constructor(`[[Construct]]`) 이다.

```js
// 26-02

var foo = function () { };

// ES6 이전의 모든 함수는 callable이면서 constructor다.
foo(); // -> undefined
new foo(); // -> foo {}
```

주의할 것은 ES6 이전에 일반적으로 메서드라고 부르던 객체에 바인딩된 함수도 callable이며 constructor라는 것이다.

객체에 바인딩된 함수가 `constructor`라는 것은 객체에 바인딩된 함수가 `prototype` 프로퍼티를 가지며 프로토타입 객체도 생성하기 때문에 성능 면에서도 문제가 있다. 콜백 함수도 마찬가지이다.

```js
// 26-03

// 프로퍼티 f에 바인딩된 함수는 callable이며 constructor다.
var obj = {
    x: 10,
    f: function () { return this.x; }
};

// 프로퍼티 f에 바인딩된 함수를 메서드로서 호출
console.log(obj.f()); // 10

// 프로퍼티 f에 바인딩된 함수를 일반 함수로서 호출
var bar = obj.f;
console.log(bar()); // undefined

// 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
console.log(new obj.f()); // f {}
```

---

함수 사용 목적에 따른 구분

| ES6 함수의 구분 | `constructor` | `prototype` | `super` | `arguments` |
| - | - | - | - | - |
| 일반 함수 | O | O | X | O |
| 메서드 | X | X | O | O |
| 화살표 함수 | X | X | X | X |

* 일반 함수 : 함수 선언문이나 함수 표현식으로 정의한 함수, ES6이전의 함수와 차이가 없다.

## 메서드

ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 말한다.

```js
// 26-05

const obj = {
    x: 1,
    // foo는 메서드이다.
    foo() { return this.x; },
    // bar에 바인딩된 함수는 메서드가 아닌 일반 함수이다.
    bar: function () { return this.x; }
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

ES6 사양에서 정의한 메서드는 인스턴스를 생성할 수 없는 non-constructor다. 따라서 `prototype` 프로퍼티가 없고 프로토타입도 생성하지 않으며 생성자 함수로서 호출할 수 없다.

표준 빌트인 객체가 제공하는 프로토타입 메서드와 정적 메서드는 모두 non-constructor다.

ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 `[[HomeObject]]`를 갖는다. `super` 참조는 내부 슬롯 `[[HomeObject]]`를 사용하여 수퍼클래스의 메서드를 참조하므로 내부 슬롯 `[[HomeObject]]`를 갖는 ES6 메서드는 `super` 키워드를 사용할 수 있다.

```js
// 26-09

const base = {
    name: 'Lee',
    sayHi() {
        return `Hi! ${this.name}`;
    }
};

const derived = {
    __proto__: base,
    // sayHi는 ES6 메서드다. ES6 메서드는 [[HomeObject]]를 갖는다.
    // sayHi의 [[HomeObject]]는 sayHi가 바인딩된 객체인 derived를 가리키고
    // super는 sayHi의 [[HomeObject]]의 프로토타입인 base를 가리킨다.
    sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    }
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

ES6 메서드가 아닌 함수는 `super` 키워드를 사용할 수 없다. ES6 메서드가 아닌 함수는 내부 슬롯 `[[HomeObject]]`를 갖지 않기 때문이다. 이처럼 ES6 메서드는 본연의 기능(`super`)을 추가하고 의미적으로 맞지 않는 기능(`constructor`)은 제거했다. 따라서 메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6 이전의 방식은 사용하지 않는 것이 좋다.

```js
// 26-10

const derived = {
    __proto__: base,
    // sayHi는 ES6 메서드가 아니다.
    // 따라서 sayHi는 [[HomeObject]]를 갖지 않으므로 super 키워드를 사용할 수 없다.
    sayHi: function () {
        // SyntaxError: 'super' keyword unexpected here
        return `${super.sayHi()}. how are you doing?`;
    }
};
```

## 화살표 함수

화살표 함수는 `function` 키워드 대신 화살표(`=>`, fat arrow)를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다. 화살표 함수는 내부 동작도 기존의 함수보다 간략하다. 특히 화살표 함수는 콜백 함수 내부에서 `this`가 전역 객체를 가리키는 문제를 문제를 해결하기 위한 대안으로 유용하다.

### 화살표 함수의 정의

#### 함수 정의

화살표 함수는 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야 한다. 호출 방식은 기존 함수와 동일하다.

```js
// 26-11

const multiply = (x, y) => x * y;
multiply(2, 3); // -> 6
```

#### 매개변수 선언

* 매개변수가 여러 개인 경우 소괄호 안에 매개변수를 선언한다.
* 매개변수가 한개인 경우 소괄호를 생략할 수 있다.
* 매개변수가 없는 경우 소괄호를 생략할 수 있다.

```js
// 26-12-01

const arrow1 = (x, y) => { console.log("arrow1") };
const arrow2 = x => { console.log("arrow2") };
const arrow3 = () => { console.log("arrow3") };

arrow1();  // arrow1
arrow2();  // arrow2
arrow3();  // arrow3
```

#### 함수 몸체 정의

함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 `{}`를 생략할 수 있다. 이때 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.

```js
// 26-15-01

// concise body
const power1 = x => x ** 2;

// 위 표현은 다음과 동일하다.
// block body
const power2 = x => { return x ** 2; };

console.log(power1(2)); // 4
console.log(power2(2)); // 4
```

함수 몸체를 감싸는 중괄호 `{}`를 생략한 경우 함수 몸체 내부의 문이 표현식이 아닌 문이라면 에러가 발생한다. 표현식이 아닌 문은 반환할 수 없기 때문이다.

```js
// 26-16

const arrow = () => const x = 1; // SyntaxError: Unexpected token 'const'

// 위 표현은 다음과 같이 해석된다.
const arrow = () => { return const x = 1; };
```

따라서 함수 몸체가 하나의 문으로 구성된다 해도 함수 몸체의 문이 표현식이 아닌 문이라면 중괄호를 생략할 수 없다.

```js
// 26-17

const arrow = () => { const x = 1; };
```

객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호로 감싸 주어야 한다.

```js
// 26-18-01

const create1 = (id, content) => ({ id, content });

// 위 표현은 다음과 동일하다.
const create2 = (id, content) => { return { id, content }; };

console.log(create1(1, 'My number is 1'));
console.log(create2(2, 'My number is 2'));
```

객체 리터럴을 소괄호로 감싸지 않으면 객체 리터럴의 중괄호를 함수 몸체를 감싸는 중괄호로 잘못 해석한다.

```js
// 26-19

// { id, content }를 함수 몸체 내의 쉼표 연산자문으로 해석한다.
const create = (id, content) => { id, content };
create(1, 'JavaScript'); // -> undefined
```

함수의 몸체가 여러 개의 문으로 구성된다면 함수 몸체를 감싸는 중괄호를 생략할 수 없다. 이때 반환값이 있다면 명시적으로 반환해야 한다.

```js
// 26-20

const sum = (a, b) => {
    const result = a + b;
    return result;
};
```

화살표 함수도 즉시 실행 함수로 사용할 수 있다.

```js
// 26-21

const person = (name => ({
    sayHi() { return `Hi? My name is ${name}.`; }
}))('Lee');

console.log(person.sayHi()); // Hi? My name is Lee.
```

화살표 함수도 일급객체이므로 고차함수에 인수로 전달할 수 있다.

```js
// 26-22

// ES5
[1, 2, 3].map(function (v) {
    return v * 2;
});

// ES6
[1, 2, 3].map(v => v * 2); // -> [ 2, 4, 6 ]
```

### 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor다.
   * `prototype` 프로퍼티가 없고 프로토타입도 생성하지 않는다.
2. 중복된 매개변수 이름을 선언할 수 없다.
   * 일반 함수는 중복된 매개변수 이름을 선언해도 에러가 발생하지 않는다.
     * 단 strict mode에서 중복된 매개변수 이름을 선언해도 에러가 발생하지 않는다.
   * 화살표 함수에서는 중복된 매개변수 이름을 선언하면 에러가 발생한다.
3. 화살표 함수는 함수 자체의 `this`, `arguments`, `super`, `new.target` 바인딩을 갖지 않는다.
   * 화살표 함수가 중첩되어 있다면 상위 화살표 함수에도 `this`, `arguments`, `super`, `new.target` 바인딩이 없으므로 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 `this`, `arguments`, `super`, `new.target`를 참조한다.

### `this`

`this` 바인딩은 함수의 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다. 다시 마랳, 함수를 정의할 때 `this`에 바인딩할 객체가 정적으로 결정되는 것이 아니고 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 `this`에 바인딩할 객체가 동적으로 결정된다.

이때 주의해야 할 것은 일반함수로서 호출되는 콜백 함수의 경우이다. 고차 함수의 인수로 전달되어 고차 함수 내부에서 호출되는 콜백 함수도 중첩 함수라고 할 수 있다.

```js
// 26-23

class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        // add 메서드는 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다.
        // ①
        return arr.map(function (item) {
            return this.prefix + item; // ②
            // -> TypeError: Cannot read property 'prefix' of undefined
        });
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
```

1. ①에서 `this`는 메서드를 호출한 객체(`prefixer`)를 가리킨다.
2. `Array.prototype.map`에 인수로 전달한 콜백 함수의 내부인 ②에서 `this`는 `undefined`를 가리킨다. 이는 `Array.prototype.map` 메서드가 콜백 함수를 일반 함수로서 호출하기 때문이다.

일반함수로 호출되는 모든 함수 내부의 `this`는 전역 객체를 가리킨다. 그런데 클래스 내부의 모든 코드에는 strict mode가 적용되는데 그러면 일반 함수로서 호출된 모든 함수 내부의 `this`에는 전역 객체가 아니라 `undefined`가 바인딩되므로 `Array.prototype.map` 메서드의 콜백 함수 내부의 `this`에는 `undefined`가 바인딩된다.

즉 콜백 함수의 `this`(①)와 외부 함수의 `this`(②)가 서로 다른 값을 가리키고 있기 때문에 `TypeError`가 발생한 것이다.

ES6에서는 화살표 함수를 사용하여 "콜백 함수 내부의 `this` 문제"를 해결할 수 있다.

```js
// 26-32

class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        return arr.map(item => this.prefix + item);
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ['-webkit-transition', '-webkit-user-select']
```

화살표 함수는 함수 자체의 `this` 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 `this`를 참조하면 상위 스코프의 `this`를 그대로 참조한다. 이를 **lexical this**라 한다.

화살표 함수 내부에서 `this`를 참조하면 일반적인 식별자처럼 스코프 체인을 통해 상위 스코프에서 `this`를 탐색한다.

화살표 함수를 `Function.prototype.bind`를 사용하여 표현하면 다음과 같다.

```js
// 26-33

// 화살표 함수는 상위 스코프의 this를 참조한다.
() => this.x;

// 익명 함수에 상위 스코프의 this를 주입한다. 위 화살표 함수와 동일하게 동작한다.
(function () { return this.x; }).bind(this);
```

화살표 함수가 중첩되어 있다면 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 `this`를 참조한다.

```js
// 26-34

// 중첩 함수 foo의 상위 스코프는 즉시 실행 함수다.
// 따라서 화살표 함수 foo의 this는 상위 스코프인 즉시 실행 함수의 this를 가리킨다.
(function () {
    const foo = () => console.log(this);
    foo();
}).call({ a: 1 }); // { a: 1 }

// bar 함수는 화살표 함수를 반환한다.
// bar 함수가 반환한 화살표 함수의 상위 스코프는 화살표 함수 bar다.
// 하지만 화살표 함수는 함수 자체의 this 바인딩을 갖지 않으므로 bar 함수가 반환한
// 화살표 함수 내부에서 참조하는 this는 화살표 함수가 아닌 즉시 실행 함수의 this를 가리킨다.
(function () {
    const bar = () => () => console.log(this);
    bar()();
}).call({ a: 1 }); // { a: 1 }
```

화살표 함수가 전역 함수라면 화살표 함수의 `this`는 전역 객체를 가리킨다.

프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 `this`를 참조한다.

```js
// 26-36-01

// increase 프로퍼티에 할당한 화살표 함수의 상위 스코프는 전역이다.
// 따라서 increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킨다.
const counter = {
    num: 1,
    print: () => console.log(this)
};

counter.print(); // window
```

화살표 함수는 함수 자체의 `this` 바인딩을 갖지 않기 때문에 `Function.prototype.call/apply/bind` 메서드를 사용해도 화살표 함수 내부의 `this`를 교체할 수 없다.

```js
// 26-37

window.x = 1;

const normal = function () { return this.x; };
const arrow = () => this.x;

console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 }));  // 1
```

화살표 함수가 `Function.prototype.call/apply/bind` 메서드를 호출할 수 없다는 의미는 아니다. 화살표 함수는 함수 자체의 `this` 바인딩을 갖지 않기 때문에 `this`를 교체할 수 없고 언제나 상위 스코프의 `this` 바인딩을 참조한다.

```js
// 26-38

const add = (a, b) => a + b;

console.log(add.call(null, 1, 2));    // 3
console.log(add.apply(null, [1, 2])); // 3
console.log(add.bind(null, 1, 2)());  // 3
```

메서드를 화살표 함수로 정의하는 것은 피해야 한다. 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.

```js
// 26-39

// Bad
const person = {
    name: 'Lee',
    sayHi: () => console.log(`Hi ${this.name}`)
};

// sayHi 프로퍼티에 할당된 화살표 함수 내부의 this는 상위 스코프인 전역의 this가 가리키는
// 전역 객체를 가리키므로 이 예제를 브라우저에서 실행하면 this.name은 빈 문자열을 갖는
// window.name과 같다. 전역 객체 window에는 빌트인 프로퍼티 name이 존재한다.
person.sayHi(); // Hi
```

프로토타입 객체의 프로퍼티에 화살표 함수를 할당하는 경우도 동일한 문제가 발생한다.

```js
// 26-41

// Bad
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);

const person = new Person('Lee');
// 이 예제를 브라우저에서 실행하면 this.name은 빈 문자열을 갖는 window.name과 같다.
person.sayHi(); // Hi
```

프로퍼티를 동적 추가할 때는 ES6 메서드 정의를 사용할 수 없으므로 일반 함수를 할당한다.

```js
// 26-42

// Good
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function () { console.log(`Hi ${this.name}`); };

const person = new Person('Lee');
person.sayHi(); // Hi Lee
```

일반 함수가 아닌 ES6 메서드를 동적 추가하고 싶다면 객체 리터럴을 바인딩하고 프로토타입의 `constructor` 프로퍼티와 생성자 함수 간의 연결을 재설정한다.

```js
// 26-43

function Person(name) {
    this.name = name;
}

Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 재설정
    constructor: Person,
    sayHi() { console.log(`Hi ${this.name}`); }
};

const person = new Person('Lee');
person.sayHi(); // Hi Lee
```

클래스 필드 정의 제안을 사용하여 클래스 필드에 화살표 함수를 할당할 수도 있다.

```js
// 26-44

// Bad
class Person {
    // 클래스 필드 정의 제안
    name = 'Lee';
    sayHi = () => console.log(`Hi ${this.name}`);
}

const person = new Person();
person.sayHi(); // Hi Lee
```
`sayHi` 클래스 필드는 인스턴스 프로퍼티이므로 다음과 같은 의미이다.

```js
// 26-45

class Person {
    constructor() {
        this.name = 'Lee';
        // 클래스가 생성한 인스턴스(this)의 sayHi 프로퍼티에 화살표 함수를 할당한다.
        // sayHi 프로퍼티는 인스턴스 프로퍼티이다.
        this.sayHi = () => console.log(`Hi ${this.name}`);
    }
}
```

이때 `sayHi` 클래스 필드에 할당한 화살표 함수 내부에서 `this`를 참조하면 상위 스코프의 `this` 바인딩을 참조한다. 그렇다면 `sayHi` 클래스 필드에 할당한 화살표 함수의 상위 스코프는 클래스 외부다. 하지만 `this`는 클래스 외부의 `this`를 참조하지 않고 클래스가 생성할 인스턴스를 참조한다. 따라서 `sayHi` 클래스 필드에 할당한 화살표 함수 내부의 `this` 또한 클래스가 생성한 인스턴스를 가리킨다.

하지만 클래스 필드에 할당한 화살표 함수는 프로토타입 메서드가 아니라 인스턴스 메서드가 된다. 따라서 메서드 정의시 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.

```js
// 26-46

// Good
class Person {
    // 클래스 필드 정의
    name = 'Lee';

    sayHi() { console.log(`Hi ${this.name}`); }
}
const person = new Person();
person.sayHi(); // Hi Lee
```

### `super`

화살표 함수는 함수 자체의 `super` 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 `super`를 참조하면 상위 스코프의 `super`를 참조한다.

```js
// 26-47

class Base {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return `Hi! ${this.name}`;
    }
}

class Derived extends Base {
    // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
    sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```

### `arguments`

화살표 함수는 함수 자체의 `arguments` 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 `arguments`를 참조하면 상위 스코프의 `arguments`를 참조한다.

```js
// 26-48

(function () {
    // 화살표 함수 foo의 arguments는 상위 스코프인 즉시 실행 함수의 arguments를 가리킨다.
    const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
    foo(3, 4);
}(1, 2));

// 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킨다.
// 하지만 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
```

## Rest 파라미터

화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.

### 기본 문법

Rest 파라미터는 매개변수 이름 앞에 세 개의 점 `...` 을 붙여서 정의한 매개변수를 의미한다. Rest 파라미터는 나중에 전달된 인수들의 목록을 배열로 전달받는다.

일반 매개변수와 Rest 파라미터는 함께 사용할 수 있다. 이때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당된다.

```js
// 26-49

function foo(...rest) {
    // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터다.
    console.log(rest); // [ 1, 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);
```

```js
// 26-50

function foo(param, ...rest) {
    console.log(param); // 1
    console.log(rest);  // [ 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
    console.log(param1); // 1
    console.log(param2); // 2
    console.log(rest);   // [ 3, 4, 5 ]
}

bar(1, 2, 3, 4, 5);
```

Rest 파라미터는 반드시 마지막 파라미터이어야 하며 단 하나만 선언할 수 있다. 선언한 매개변수 개수를 나타내는 함수 객체의 `length` 프로퍼티에 영향을 주지 않는다.

### Rest 파라미터와 `arguments` 객체

`arguments` 객체는 배열이 아닌 유사 배열 객체이므로 배열 메서드를 사용하려면 `Function.prototype.call/apply` 메서드를 사용해 `arguments` 객체를 배열로 변환해야 하는 번거로움이 있었다.

```js
// 26-55

function sum() {
    // 유사 배열 객체인 arguments 객체를 배열로 변환한다.
    var array = Array.prototype.slice.call(arguments);

    return array.reduce(function (pre, cur) {
        return pre + cur;
    }, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

rest 파라미터를 사용하면 가변 인자 함수의 인수 목록을 배열로 직접 전달받을 수 있다. 

```js
// 26-56

function sum(...args) {
    // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
    return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

## 매개변수 기본값

ES6에서 도입된 매개변수 기본값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화할 수 있다. 매개변수 기본값은 매개변수에 인수를 전달하지 않은 경우와 `undefined`를 전달한 경우에만 유효하다.

```js
// 26-59

function sum(x = 0, y = 0) {
    return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1));    // 1
```

```js
// 26-60

function logName(name = 'Lee') {
    console.log(name);
}

logName();          // Lee
logName(undefined); // Lee
logName(null);      // null
```

* Rest 파라미터에는 기본값을 지정할 수 없다.
* 매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 `length` 프로퍼티와 `arguments` 객체에 아무런 영향을 주지 않는다.

## 문제

```js
const person = (name => ({
    sayHi() { return `Hi? My name is ${name}.`; }
}))('Lee');

console.log(person.sayHi()); // Hi? My name is Lee.

const person1 = (() => console.log('hi'));

const person2 = (() => console.log('hi'))();
```

```js
class BaseClass {
    constructor() {
        console.log(this, "Q");
        const test1 = (() => {
            console.log(this, "P");
            const test2 = (() => {
                console.log(this, "A");
            })();
        })();
    }
}

const base = new BaseClass();

console.log(base, "E")
```

```js
x = 1;
var y = 2;
let z = 3;

function test() {
    console.log(this.x);
    console.log(this.y);
    console.log(this.z);

    console.log(x);
    console.log(y);
    console.log(z);
}

test()
```

```js
x = 1;
var y = 2;
let z = 3;

function test() {
    console.log(this.x);
    console.log(this.y);
    console.log(this.z);

    console.log(x);
    console.log(y);
    console.log(z);
}

test()
console.log('------------------')
test({ x: 10, y: 20, z: 30 })
console.log('------------------')
test.call({ x: 10, y: 20, z: 30 })
```
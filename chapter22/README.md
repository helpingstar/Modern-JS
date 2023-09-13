# chapter22 this

## `this` 키워드

동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다. 이때 메서드가 자신이 속한 객체의 프로퍼티를 참조하렴녀 먼저 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.

`this`는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다. `this`를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

`this`가 가리키는 값, `this` 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

```js
// 22-03

// 객체 리터럴
const circle = {
    radius: 5,
    getDiameter() {
      // this는 메서드를 호출한 객체를 가리킨다.
      return 2 * this.radius;
    }
  };
  
  console.log(circle.getDiameter()); // 10
```

생성자 함수 내부의 `this`는 생성자 함수가 생성할 인스턴스를 가리킨다. 함수가 호출되는 방식에 따라 `this`에 바인딩 될 값이 결정된다.

```js
// this는 어디서든지 참조 가능하다.
// 전역에서 this는 전역 객체 window를 가리킨다.
console.log(this); // window

function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
  console.log(this); // window
  return number * number;
}
square(2);

const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다.
    console.log(this); // {name: "Lee", getName: ƒ}
    return this.name;
  }
};
console.log(person.getName()); // Lee

function Person(name) {
  this.name = name;
  // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  console.log(this); // Person {name: "Lee"}
}

const me = new Person('Lee');
```

`this`는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다. 따라서 strict mode 가 적용된 일반 함수 내부의 `this`에는 `undefined`가 바인딩된다. 일반 함수 내부에서 `this`를 사용할 필요가 없기 때문이다.

## 함수 호출 방식과 `this` 바인딩

`this` 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.

함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 `this` 바인딩은 함수 호출 시점에 결정된다.

### 일반 함수 호출

기본적으로 `this`에는 전역 객체가 바인딩된다. strict mode가 적용된 일반 함수의 `this` 에는 `undefined`가 바인딩된다.

```js
// 22-07

function foo() {
  console.log("foo's this: ", this);  // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수의 `this`에는 전역 객체가 바인딩된다. 콜백함수도 마찬가지이다. **어떠한 함수라도 일반 함수로 호출되면 `this`에 전역 객체가 바인딩된다.**

```js
// var 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티다.
var value = 1;
// const 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티가 아니다.
// const value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this);  // {value: 100, foo: ƒ}
    console.log("foo's this.value: ", this.value); // 100

    // 메서드 내에서 정의한 중첩 함수
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }

    // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
    bar();
  }
};

obj.foo();
```

콜백 함수의 `this` 바인딩을 메서드의 `this` 바인딩과 일치시키기 위한 방법은 다음과 같다.

```js
// 22-11

var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)을 변수 that에 할당한다.
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  }
};

obj.foo();
```

이외에도 `this`를 명시적으로 바인딩할 수 있는 `Function.prototype.apply`, `Function.prototype.call`, `Function.prototype.bind` 메서드를 제공한다.


또는 화살표 함수를 사용해서 `this` 바인딩을 일치시킬 수도 있다.

```js
// 22-13

var value = 1;

const obj = {
  value: 100,
  foo() {
    // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
    setTimeout(() => console.log(this.value), 100); // 100
  }
};

obj.foo();
```

### 메서드 호출

메서드 내부의 `this`에는 메서드를 **호출**한 객체가 바인딩된다.

```js
// 22-14

const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```

`person` 객체의 `getName` 프로퍼티가 가리키는 함수 객체는 `person` 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다. `getName` 프로퍼티가 함수 객체를 가리키고 있을 뿐이다.

```js
// 22-15-01

const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};
  

const anotherPerson = {
    name: 'Kim'
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
// Node.js 환경에서 this.name은 undefined다.
```

프로토타입 메서드 내부에서 사용된 `this`도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다.

```js
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

const me = new Person('Lee');

// getName 메서드를 호출한 객체는 me다.
console.log(me.getName()); // ① Lee

Person.prototype.name = 'Kim';

// getName 메서드를 호출한 객체는 Person.prototype이다.
console.log(Person.prototype.getName()); // ② Kim
```

### 생성자 함수 호출

생성자 함수 내부의 `this`에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

```js
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

### `Function.prototype.apply/call/bind` 메서드에 의한 간접 호출

`apply`와 `call` 메서드의 본질적인 기능은 함수를 호출하는 것이다. `apply`와 `call` 메서드는 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 `this`에 바인딩한다.

```js
/*
 * 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
 * @returns 호출된 함수의 반환값
 */
function.prototype.apply(thisArg[, argsArray])

/*
 * 주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param arg1, arg2, ... - 함수에게 전달할 인수 리스트
 * @returns 호출된 함수의 반환값
 */
function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

`apply`와 `call` 메서드의 대표적인 용도는 `arugments` 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다 `arguments` 객체는 배열이 아니기 때문에 `Array.prototype.slice` 같은 배열의 메서드를 사용할 수 없으나 `apply`와 `call` 메서드를 이용하면 가능하다.

`function.prototype` 메서드는 `apply`, `call` 메서드와 달리 함수를 호출하지 않는다. 다만 첫 번째 인수로 전달한 값으로 `this` 바인딩이 교체된 함수를 새롭게 생성해 반환한다.

```js
// 22-22

function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된
// getThisBinding 함수를 새롭게 생성해 반환한다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

`bind` 메서드는 `this`와 메서든 내부의 중첩 함수 또는 콜백 함수의 `this`가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

```js
// 22-23

const person = {
  name: 'Lee',
  foo(callback) {
    // ①
    setTimeout(callback, 100);
  }
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // ② Hi! my name is .
  // 일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
  // 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
  // Node.js 환경에서 this.name은 undefined다.
});
```

```js
// 22-24

const person = {
  name: 'Lee',
  foo(callback) {
    // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this), 100);
  }
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // Hi! my name is Lee.
});
```

| 함수 호출 방식 | `this` 바인딩 |
| - | - |
| 일반 함수 호출 | 전역 객체 |
| 메서드 호출 | 메서드를 호출한 객체 |
| 생성자 함수 호출 | 생성자 함수가 (미래에) 생성할 인스턴스 |
| `Function.prototype.apply/call/bind` 메서드에 의한 간접 호출 | `Function.prototype.apply/call/bind` 메서드에 첫 번째 인수로 전달한 객체 |

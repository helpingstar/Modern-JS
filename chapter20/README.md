# chapter20 strict mode

## 20.1 strict mode란?

```js
// 20-01

function foo() {
    x = 10;
}
foo();

console.log(x); // ?
```

위 코드는 `ReferenceError`를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 `x` 프로퍼티를 동적 생성한다. 이러한 현상을 암묵적 전역이라 한다.

이는 오류의 위험을 높인다.

strict mode는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

ES6에서 도입된 클래스와 모듈은 기본적으로 strict mode가 적용된다.

## strict mode의 적용

전역의 선두 또는 함수 몸체 선두에 `'use strict';`를 추가한다.

코드의 선두에 `use strict';`를 위치시키지 않으면 strict mode가 제대로 동작하지 않는다.

```js
// 20-04

function foo() {
    x = 10; // 에러를 발생시키지 않는다.
    'use strict';
}
foo();
```

## 전역에 strict mode를 적용하는 것은 피하자

전역에 적용한 strict mode는 스크립트 단위로 적용된다.

strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다. 이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수 선두에 strict mode를 적용한다.

## 함수 단위로 strict mode를 적용하는 것도 피하자

strict mode가 적용된 함수가 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 문제가 발생할 수 있다. strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

```js
// 20-07

(function () {
    // non-strict mode
    var lеt = 10; // 에러가 발생하지 않는다.

    function foo() {
        'use strict';

        let = 20; // SyntaxError: Unexpected strict mode reserved word
    }
    foo();
}());
```

## strict mode가 발생시키는 에러

### 암묵적 전역
선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.

### 변수, 함수, 매개변수의 삭제
delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생한다.

### 매개변수 이름의 중복
중복된 매개변수 이름을 사용하면 SyntaxError가 발생한다.

### with 문의 사용
`with` 문은 전달된 객체를 스코프 체인에 추가한다. `with` 문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있다. 따라서 `with` 문은 사용하지 않는 것이 좋다.

## strict mode 적용에 의한 변화

### 일반 함수의 this

strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

```js
// 20-12

(function () {
    'use strict';

    function foo() {
        console.log(this); // undefined
    }
    foo();

    function Foo() {
        console.log(this); // Foo
    }
    new Foo();
}());
```

### arguments 객체
strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

```js
// 20-13

(function (a) {
    'use strict';
    // 매개변수에 전달된 인수를 재할당하여 변경
    a = 2;

    // 변경된 인수가 arguments 객체에 반영되지 않는다.
    console.log(arguments); // { 0: 1, length: 1 }
}(1));
```
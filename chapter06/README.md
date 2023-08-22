# Chapter06 데이터 타입

* 원시 타입
  * 숫자
  * 문자열
  * 불리언
  * `undefined`
  * `null`
  * 심벌
* 객체 타입

## 숫자 타입

배정밀도 64비트 부동소수점 형식을 따른다. 모든 수를 실수로 처리하며 정수만 표현하기 위한 데이터타입이 별도로 존재하지 않는다. 2, 8, 16진수를 표현하기 위한 데이터 타입을 제공하지 않기 때문에 모두 10진수로 해석된다.

```js
// 06-01
// 모두 숫자 타입이다.
var integer = 10; // 정수
var double = 10.12; // 실수
var negative = -20; // 음의 정수
```

```js
// 06-02
var binary = 0b01000001; // 2진수
var octal = 0o101; // 8진수
var hex = 0x41; // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal); // 65
console.log(hex); // 65
console.log(binary === octal); // true
console.log(octal === hex); // true
```

```js
// 06-03
// 숫자 타입은 모두 실수로 처리된다.
console.log(1 === 1.0); // true
console.log(4 / 2); // 2
console.log(3 / 2); // 1.5
```

숫자 타입은 세 가지 특별한 값도 표현할 수 있다.

* Infinity : 양의 무한대
* -Infinity : 음의 무한대
* NaN : 산술 연산 불가(not-a-number)

```js
// 06-04
// 숫자 타입의 세 가지 특별한 값
console.log(10 / 0); // Infinity
console.log(10 / -0); // -Infinity
console.log(1 * 'String'); // NaN
```

자바스트립트는 대소문자를 구별하므로 `NaN`은 `NAN`, `nan`, `Nan`과 구별된다.

* `NaN`이 관계 비교(`>`, `<`, `>=`, `<=`)의 피연산자 중 하나인 경우 결과는 항상 `false`입니다.
* `NaN`은 ( `==`, `!=`, `===` (en-US) 및 `!==` (en-US) 를 통해) 다른 `NaN` 값을 포함하여 다른 값과 같지 않은 것으로 비교됩니다.

```js
// 06-04-01
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false
console.log(isNaN(NaN)); // true
```

## 문자열 타입

문자열은 0개 이상의 16비트 유니코드 문자(UTF-16)의 집합이다.

**작은 따옴표** `''`, 큰 따옴표 `""`, 백틱 ` `` ` 으로 텍스트를 감싼다.

문자열 안에 따옴표를 표현하고 싶을 경우 다른 종류의 따옴표로 감싸거나 백슬래시(`\`)를 활용한다

```js
// 06-06-01
var string1 = "String";
var string2 = "'String'";
var string3 = '"String"';
var string4 = '\'String\'';
var string5 = "\"String\"";

console.log(string1); // String
console.log(string2); // 'String'
console.log(string3); // "String"
console.log(string4); // 'String'
console.log(string5); // "String"
```

자바스크립트의 문자열은 원시 타입이며 변경 불가능한 값(immutable value)이다.

## 템플릿 리터럴

ES6부터 도입된 새로운 문자열 표기법. 멀티라인 문자열, 표현식 삽입, 태그드 템플릿 등 편리한 문자열 처리 기능을 제공한다. 런타임에 일반 문자열로 변환되어 처리된다.

템플릿 리터럴은 백틱(` `` `)을 사용해 표현한다

### 멀티라인 문자열

일반 문자열 내에서는 줄바꿈이 허용되지 않아 줄바꿈 등의 공백을 표현하려면 백슬래시로 시작하는 이스케이프 시퀀스를 사용해야 한다.

하지만 템플릿 리터럴 내에서는 줄바꿈이 허용되며 모든 공백도 있는 그대로 적용된다.

```js
// 06-10
var template = '<ul>\n\t<li><a href="#">Home</a></li>\n</ul>';
console.log(template);
```

```js
// 06-11
var tempalte = `<ul>
    <li><a href="#">Home</a></li>
</ul>`;
console.log(tempalte);
```

```text
[OUTPUT] : 06-10, 06-11
<ul>
    <li><a href="#">Home</a></li>
</ul>
```

### 표현식 삽입

문자열을 문자열 연산자 `+`를 사용해 연결할 수 있다. `+` 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작한다.

템플릿 리터럴 내에서는 표현식 삽입을 통해 문자열을 삽입할 수 있다. 표현식을 삽입하려면 `${ }` 으로 표현식을 감싼다. 표현식의 평가 결과가 문자열이 아니더라도 문자열로 타입이 강제로 변환되어 삽입된다.

```js
// 06-12-01
var first = 'Micheal';
var last = 'Jackson';

// ES5: string concatenation
console.log('Hello, ' + first + ' ' + last + '!');
// ES6: template literal
console.log(`Hello, ${first} ${last}!`);
```

```text
[OUTPUT] 06-12-01
Hello, Micheal Jackson!
Hello, Micheal Jackson!
```

템플릿 리터럴이 아닌 일반 문자열에서의 표현식 삽입은 문자열로 취급된다.

```js
// 06-15
console.log('1 + 2 = ${1 + 2}') // 1 + 2 = ${1 + 2}
```

## 불리언 타입

논리적 참, 거짓을 나타내는 `true`와 `false` 뿐이다.

## undefined 타입

`undefined` 타입의 값은 `undefined`가 유일하다. 변수 참조시 `undefined`가 반환된다면 참조한 변수가 선언 이후 값이 할당된 적이 없는 변수라는 것을 알 수 있다.

`undefined`를 할당하는 것은 권장하지 않는다. 값이 없다는 것을 명시하고 싶을 경우 `null`을 할당한다.

## null 타입

`null` 타입의 값은 `null`이 유일하다. 변수에 값이 없다는 것을 의도적으로 명시할 때 사용한다. 변수에 `null`을 할당하는 것은 변수가 이전에 참조하던 값을 더 이상 참조하지 않겠다는 의미이다.

함수가 유효한 값을 반환할 수 없는 경우 명시적으로 `null`을 반환하기도 한다.

## 심벌 타입

ES6에서 추가된 7번째 타입, 변경 불가능한 원시 타입의 값. 다른 값과 중복되지 않는 유일한 값. 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용

심벌 이외의 원시 값은 리터럴을 통해 생성하지만 심벌은 `Symbol` 함수를 호출해 생성한다. 이 때 생성된 심벌 값은 외부에 노출되지 않으며, 다른 값과 절대 중복되지 않는 유일무이한 값이다.

```js
// 06-20
var key = Symbol('key');
console.log(typeof key); // symbol
console.log(key.toString()); // Symbol(key)

// 객체 생성
var obj = {};

// 이름이 충돌할 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용한다.
obj[key] = 'value';
console.log(obj[key]); // value
console.log(obj.key); // undefined
console.log(obj['key']); // undefined
```

## 데이터 타입의 필요성

* 데이터 타입에 의한 메모리 공간의 확보와 참조
* 데이터 타입에 의한 값의 해석

## 동적 타이핑

정적 타입 언어는 변수의 타입을 변경할 수 없으며, 선언한 타입에 맞는 값만 할당할 수 있다. 컴파일 시점에 타입 체크를 수행한다.

자바스크립트는 변수를 선언할 때 타입을 선언하지 않는다. 다만 `var`, `let`, `const` 키워드를 사용해 변수를 선언한다. 미리 선언한 데이터 타입의 값만 할당할 수 있는 것이 아니라 어떤 데이터 값이라도 자유롭게 할당할 수 있다.

```js
// 06-23
var foo;
console.log(typeof foo); // undefined

foo = 3;
console.log(typeof foo); // number

foo = 'Hello';
console.log(typeof foo); // string

foo = true;
console.log(typeof foo); // boolean

foo = null;
console.log(typeof foo); // object

foo = Symbol();
console.log(typeof foo); // symbol

foo = {};
console.log(typeof foo); // object

foo = [];
console.log(typeof foo); // object

foo = function () { };
console.log(typeof foo); // function
```

자바스크립트의 변수는 선언이 아닌 할당에 의해 타입이 결정(타입 추론)된다. 그리고 재할당에 의해 변수의 타입은 언제든지 동적으로 변할 수 있다 이러한 특징을 **동적 타이핑**이라 하며 이러한 언어를 **동적 타입 언어**라고 한다.

하지만 그로 인해 구조적인 단점도 있다.

* 변화하는 변수 값을 추적하기 어려울 수 있다.
* 타입이 언제든지 변경될 수 있다.
* 자바스크립트 엔진에 의해 타입이 자동으로 변환되기도 한다.
* 유연성은 높지만 신뢰성은 떨어진다.

이에 주의할 사항은 다음과 같다.

* 변수는 꼭 필요한 경우에 한해 제한적으로 사용한다.
* 스코프는 최대한 좁게 만들어 변수의 부작용을 억제한다.
* 전역변수는 최대한 사용하지 않도록 한다.
* 변수보다는 상수를 사용해 값의 변경을 억제한다.
* 변수 이름은 목적이나 의미를 파악할 수 있도록 네이밍한다.

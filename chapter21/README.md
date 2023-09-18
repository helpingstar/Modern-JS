# chapter21 빌트인 객체

## 자바스크립트 객체의 분류

* 표준 빌트인 객체 : ECMAScript 사양에 정의된 객체, 애플리케이션 전역의 공통 기능을 제공
* 호스트 객체 : ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경에서 추가로 제공하는 객체 
* 사용자 정의 객체 : 사용자가 직접 정의한 객체

## 표준 빌트인 객체

* 생성자 함수 객체인 표준 빌트인 객체 : 프로토타입 메서드와 정적 메서드를 제공
  * `String`, `Number`, `Boolean`, `Function`, `Array`, `Date`
* 생성자 함수 객체가 아닌 표준 빌트인 객체 : 정적 메서드만 제공
  * `Math`, `Reflect`, `JSON`

생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 `prototype` 프로퍼티에 바인딩된 객체다. 이는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다.

```js
// 21-03

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5); // Number {1.5}

// toFixed는 Number.prototype의 프로토타입 메서드다.
// Number.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환한다.
console.log(numObj.toFixed()); // 2

// isInteger는 Number의 정적 메서드다.
// Number.isInteger는 인수가 정수(integer)인지 검사하여 그 결과를 Boolean으로 반환한다.
console.log(Number.isInteger(0.5)); // false
```

## 원시 값과 래퍼 객체

원시 값에 대해 마치 객체처럼 접근하면 자바스크립트 엔진이 일시적으로 원시값을 연관된 객체로 변환해주기 때문에 원시값이 마치 객체처럼 동작한다.

문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼 객체라 한다.

```js
// 21-04

const str = 'hello';

// 원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작한다.
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO
```

*[그림 21-1]*

이후 래퍼 객체의 처리가 종료되면 식별자가 래퍼 객체의 내부 슬롯에 할당된 원시 값을 갖도록 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 된다.

```js
// 21-06

// ① 식별자 str은 문자열을 값으로 가지고 있다.
const str = 'hello';

// ② 식별자 str은 암묵적으로 생성된 래퍼 객체를 가리킨다.
// 식별자 str의 값 'hello'는 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
// 래퍼 객체에 name 프로퍼티가 동적 추가된다.
str.name = 'Lee';

// ③ 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 ②에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.

// ④ 식별자 str은 새롭게 암묵적으로 생성된(②에서 생성된 래퍼 객체와는 다른) 래퍼 객체를 가리킨다.
// 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않는다.
console.log(str.name); // undefined

// ⑤ 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 ④에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.
console.log(typeof str, str); // string hello
```

`String`, `Number`, `Boolean` 생성자 함수를 `new` 연산자와 함께 호출하여 인스턴스를 생성할 필요가 없으며 권장하지도 않는다. `null`, `undefined`는 래퍼 객체를 생성하지 않아 객체처럼 사용하면 에러가 발생한다.

## 전역 객체

코드가 실행되기 이전에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이며 어떤 객체에도 속하지 않은 최상위 객체다.

지칭하는 이름

* 브라우저 : `window`, `self`, `this`, `frames`
* Node.js : `global`
* 브라우저, Node.js 통일 : `globalThis`

전역 객체는 표준 빌트인 객체와 환경에 따른 호스트 객체, 그리고 `var` 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.

전역 객체 특징

* 개발자가 의도적으로 생성할 수 없다. 즉, 전역 객체를 생성할 수 있는 생성자 함수가 제공되지 않는다.
* 전역 객체의 프로퍼티를 참조할 때 `window` 또는 `global`을 생략할 수 있다.
* 전역 객체는 표준 빌트인 객체(`Object`, `String`, `Number` ...)를 프로퍼티로 가지고 있다.
* 자바스크립트 실행 환경에 따라 추가적으로 프로퍼티와 메서드를 갖는다.
* `var` 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.

```js
// 21-10

// var 키워드로 선언한 전역 변수
var foo = 1;
console.log(window.foo); // 1

// 선언하지 않은 변수에 값을 암묵적 전역. bar는 전역 변수가 아니라 전역 객체의 프로퍼티다.
bar = 2; // window.bar = 2
console.log(window.bar); // 2

// 전역 함수
function baz() { return 3; }
console.log(window.baz()); // 3
```

* `let`이나 `const` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 보이지 않는 개념적인 블록 내에 위치하게 된다.
* 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 `window`를 공유한다.

### 빌트인 전역 프로퍼티

전역 객체의 프로퍼티

* `Infinity` : 무한대를 나타내는 숫자값
* `NaN` : 숫자가 아님을 나타내는 숫자 값 (= `Number.NaN`)
* `undefined` : 원시 타입 `undefined`를 값으로 가짐

### 빌트인 전역 함수

애플리케이션 전역에서 호출할 수 있는 빌트인 함수

#### `eval`

자바스크립트 코드를 나타내는 문자열을 인수로 전달받는다. 

전달받은 문자열 코드

* 표현식 : 문자열 코드를 런타임에 평가하여 값을 생성
* 표현식이 아닌 문 : 문자열 코드를 런타임에 실행
* 여러 개의 문 : 모든 문을 실행

```js
/*
 * 주어진 문자열 코드를 런타임에 평가 또는 실행한다.
 * @param {string} code -> 코드를 나타내는 문자열
 * @returns {*} 문자열 코드를 평가/실행한 결과값
 */
eval(code)
```

* not strict mode : 기존의 스코프를 동적으로 수정할 수도 있다.
* strict mode : 기존의 스코프를 수정하지 않고 `eval` 함수 자신의 자체적인 스코프를 생성한다.

인수로 전달받은 문자열 코드가 `let`, `const` 키워드를 사용한 변수 선언문이라면 암묵적으로 strict mode가 적용된다.

속도가 느리고 보안에도 취약하므로 사용을 하지 말아야 한다.

#### `isFinite`

전달받은 인수가 정상적인 유한수인지 검사하여 유한수이면 `true`를 반환하고 무한수이면 `false`를 반환한다.

숫자가 아닐 경우 암묵적으로 변환하고 검사하며 인수가 `NaN`으로 평가된다면 `false`를 반환한다. `null`은 0으로 평가되어 `true`를 반환한다.

```js
/*
 * 전달받은 인수가 유한수인지 확인하고 그 결과를 반환한다.
 * @param {number} testValue -> 검사 대상 값
 * @returns {boolean} 유한수 여부 확인 결과
 */
isFinite(testValue)
```

#### `isNaN`

전달받은 인수가 `NaN`인지 검사하여 그 결과를 불리언 타입으로 반환한다.

```js
/*
 * 주어진 숫자가 NaN인지 확인하고 그 결과를 반환한다.
 * @param {number} testValue -> 검사 대상 값
 * @returns {boolean} NaN 여부 확인 결과
 */
isNaN(testValue)
```

#### `parseFloat`

전달받은 문자열 인수를 실수로 해석하여 반환한다.

```js
/* 
 * 전달받은 문자열 인수를 실수로 해석하여 반환한다.
 * @param {string} string -> 변환 대상 값
 * @returns {number} 변환 결과
 */
parseFloat(string)
```

#### `parseInt`

전달받은 문자열 인수를 정수로 해석하여 반환한다. 두 번째 인수로 진법을 나타내는 기수를 지정하지 않더라도 첫 번째 인수로 전달된 

* 공백이 있다면 첫 번째 문자열만 해석한다.
* 문자열이 `0x`, 또는 `0X`로 시작하는 16진수 리터럴이라면 16진수로 해석하여 10진수 정수로 변환한다. 2, 8진수 리터럴은 제대로 해석하지 못한다.
* 첫 번째 인수로 전달한 문자열의 첫 번째 문자가 해당 지수의 숫자로 변환될 수 없다면 `NaN`을 반환한다.
* 첫 번째 인수로 전달한 문자열의 두 번째 문자부터 해당 진수를 나타내는 숫자가 아닌 문자와 마주치면 이 문자와 계속되는 문자들은 전부 무시되며 해석된 정수값만 반환한다.

```js
/*
 * 전달받은 문자열 인수를 정수로 해석하여 반환한다.
 * @param {string} string -> 변환 대상 값
 * @param {number} [radix] -> 진법을 나타내는 기수(2 ~ 36, 기본값 10)
 * @returns {number} 변환 결과
 */
parseInt(string, radix)
```

#### `encodeURI` / `decodeURI`

`encodeURI` 함수는 완전한 URI 를 문자열로 전달받아 시스케이프 처리를 위해 인코딩한다.

```text
          userinfo       host      port
          ┌──┴───┐ ┌──────┴──────┐ ┌┴┐
  https://john.doe@www.example.com:123/forum/questions/?tag=networking&order=newest#top
  └─┬─┘   └─────────────┬────────────┘└───────┬───────┘ └────────────┬────────────┘ └┬┘
  scheme          authority                  path                  query           fragment

  ldap://[2001:db8::7]/c=GB?objectClass?one
  └┬─┘   └─────┬─────┘└─┬─┘ └──────┬──────┘
  scheme   authority   path      query

  mailto:John.Doe@example.com
  └─┬──┘ └────┬─────────────┘
  scheme     path

  news:comp.infosystems.www.servers.unix
  └┬─┘ └─────────────┬─────────────────┘
  scheme            path

  tel:+1-816-555-1212
  └┬┘ └──────┬──────┘
  scheme    path

  telnet://192.0.2.16:80/
  └─┬──┘   └─────┬─────┘│
  scheme     authority  path

  urn:oasis:names:specification:docbook:dtd:xml:4.1.2
  └┬┘ └──────────────────────┬──────────────────────┘
  scheme                    path
```

```js
/*
 * 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다.
 * @param {string} uri -> 완전한 URI
 * @returns {string} 인코딩된 URI
 */
encodeURI(uri)
```

* 인코딩 : URI의 문자들을 이스케이프 처리하는 것
* 이스케이프 처리 : 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋으로 변환하는 것

```js
/*
 * 인코딩된 URI를 전달받아 이스케이프 처리 이전으로 디코딩한다.
 * @param {string} encodedURI -> 인코딩된 URI
 * @returns {string} 디코딩된 URI
 */
decodeURI(encodedURI)
```

```js
// 21-35

const uri = 'http://example.com?name=박우성&job=programmer&teacher';

// encodeURI 함수는 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩한다.
const enc = encodeURI(uri);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

// decodeURI 함수는 인코딩된 완전한 URI를 전달받아 이스케이프 처리 이전으로 디코딩한다.
const dec = decodeURI(enc);
console.log(dec);
// http://example.com?name=박우성&job=programmer&teacher
```

#### `encodeURIComponent` / `decodeURIComponent`

* `encodeURIComponent` : URI 구성 요소를 인수로 전달받아 인코딩한다
* `decodeURIComponent` : 매개변수로 전달된 URI 구성 요소를 디코딩한다.

```js
/*
 * URI의 구성요소를 전달받아 이스케이프 처리를 위해 인코딩한다.
 * @param {string} uriComponent -> URI의 구성요소
 * @returns {string} 인코딩된 URI의 구성요소
 */
encodeURIComponent(uriComponent)
```

```js
/*
 * 인코딩된 URI의 구성요소를 전달받아 이스케이프 처리 이전으로 디코딩한다.
 * @param {string} encodedURIComponent -> 인코딩된 URI의 구성요소
 * @returns {string} 디코딩된 URI의 구성요소
 */
decodeURIComponent(encodedURIComponent)
```

```js
// 21-36

// URI의 쿼리 스트링
const uriComp = 'name=박우성&job=programmer&teacher';

// encodeURIComponent 함수는 인수로 전달받은 문자열을 URI의 구성요소인 쿼리 스트링의 일부로 간주한다.
// 따라서 쿼리 스트링 구분자로 사용되는 =, ?, &까지 인코딩한다.
let enc = encodeURIComponent(uriComp);
console.log(enc);
// name%3D%EC%9D%B4%EC%9B%85%EB%AA%A8%26job%3Dprogrammer%26teacher

let dec = decodeURIComponent(enc);
console.log(dec);
// 박우성&job=programmer&teacher

// encodeURI 함수는 인수로 전달받은 문자열을 완전한 URI로 간주한다.
// 따라서 쿼리 스트링 구분자로 사용되는 =, ?, &를 인코딩하지 않는다.
enc = encodeURI(uriComp);
console.log(enc);
// name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

dec = decodeURI(enc);
console.log(dec);
// name=박우성&job=programmer&teacher
```

### 암묵적 전역

```js
// 21-37

var x = 10; // 전역 변수

function foo () {
  // 선언하지 않은 식별자에 값을 할당
  y = 20; // window.y = 20;
}
foo();

// 선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
console.log(x + y); // 30
```

1. `foo` 함수 호출
2. `y` 변수의 선언을 찾을 수 없다.
3. `y=20` 을 `window.y = 20` 으로 해석하여 전역 객체에 프로퍼티를 동적 생성
4. `y`는 전역 객체의 프로퍼티가 되어 전역 변수처럼 동작
5. 이러한 현상을 암묵적 전역이라 한다.

하지만 `y`는 전역 객체의 프로퍼티로 추가된 것이지 변수가 아니므로 변수 호이스팅이 발생하지 않는다. 그러므로 `y`는 `delete` 연산자로 삭제할 수 있다.
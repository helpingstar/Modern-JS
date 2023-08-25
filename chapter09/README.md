# chapter09 타입 변환과 단축 평가

## 타입 변환이란?

개발자가 의도적으로 값의 타입을 변환하는 것을 명시적 타입 변환 또는 타입 캐스팅이라 한다.

```js
// 09-01

var x = 10;

// 명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다.
var str = x.toString();
console.log(typeof str, str); // string 10

// x 변수의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10
```

```js
// 09-02

var x = 10;

// 암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.

var str = x + '';
console.log(typeof str, str); // string 10

// x 변수의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10
```

`x + ''`을 평가하기 위해 `x` 변수의 숫자 값을 바탕으로 새로운 문자열 값 `10`을 생성하고 이것으로 표현식 `'10' + ''`을 평가

원시 값은 변경 불가능한 값이므로 타입 변환이 기존 원시 값을 변경할 수 없다. 자바스크립트 엔진은 표현식을 에러 없이 평가하기 위해 피연산자의 값을 암묵적 타입 변환해 새로운 타입의 값을 만들어 단 한 번 사용하고 버린다.

## 암묵적 타입 변환

자바스크립트 엔진은 표현식을 평가할 때 개발자의 의도와는 상관없이 코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제 변환(암묵적 타입 변환) 할 때가 있다.

```js
// 09-03

// 피연산자가 모두 문자열 타입이어야 하는 문맥
'10' + 2 // -> '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * '10' // -> 50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
!0 // -> true
if (1) { }
```

```python
# python

'10' * 2 # -> '1010'
```

### 문자열 타입으로 변환

```js
// 09-06

// 숫자 타입 -> 문자열 타입
0 + '' // -> "0"
-0 + '' // -> "0"
1 + '' // -> "1"
-1 + '' // -> "-1"
NaN + '' // -> "NaN"
Infinity + '' // -> "Infinity"
-Infinity + '' // -> "-Infinity"

// 불리언 타입 -> 문자열 타입
true + '' // -> "true"
false + '' // -> "false"

// null 타입 -> 문자열 타입
null + '' // -> "null"

// undefined 타입 -> 문자열 타입
undefined + '' // -> "undefined"

// 심벌 타입 -> 문자열 타입
(Symbol()) + '' // -> TypeError: Cannot convert a Symbol value to a string

// 객체 타입 -> 문자열 타입
({}) + '' // -> "[object Object]"
Math + '' // -> "[object Math]"
[] + '' // -> ""
[10, 20] + '' // -> "10,20"
(function(){}) + '' // -> "function(){}"
Array + '' // -> "function Array() { [native code] }"
```

### 숫자 타입으로 변환

```js
// 09-07

1 - '1' // 0
1 * '10' // 10
1 / 'one' // NaN
```

자바스크립트 엔진은 산술 연산자의 표현식을 평가하기 위해 산술 연산자의 피연산자 중에서 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환한다. 이때 변환할 수 없는 경우 `NaN`이 된다.

```js
// 09-08

'1' > 0 // -> true
```

자바 스크립트 엔진은 비교 연산자 표현식을 평가하기 위해 비교 연산자의 피연산자 중에서 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환한다.

```js
// 09-09

// 문자열 타입 -> 숫자 타입
+'' // -> 0
+'1' // -> 1
+'string' // -> NaN

// 불리언 타입 -> 숫자 타입
+true // -> 1
+false // -> 0

// null 타입 -> 숫자 타입
+null // -> 0

// undefined 타입 -> 숫자 타입
+undefined // -> NaN

// 심벌 타입 -> 숫자 타입
+Symbol() // -> TypeError: Cannot convert a Symbol value to a number

// 객체 타입 -> 숫자 타입
+{} // -> NaN
+[] // -> 0
+[10, 20] // -> NaN
+(function(){}) // -> NaN
```

`+` 단항 연산자는 피연산자가 숫자 타입의 값이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 수행한다.

### 불리언 타입으로 변환

`if` 문이나 `for`문과 같이 논리적 참/거짓으로 평가되어야 하는 표현식은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환 한다.

```js
// 09-11

if ('')     console.log('1');
if (true)   console.log('2');
if (0)      console.log('3');
if ('str')  console.log('4');
if (null)   console.log('5');

// 2 4
```

자바 스크립트 엔진은 불리언 타입이 아닌 값을 Truthy(-> `true`) 값 또는 Falsy(-> `false`) 값으로 구분한다.

`false`로 평가되는 Falsy값

* `false`
* `undefined`
* `null`
* `0`, `-0`
* `NaN`
* `''`

`true`로 평가되는 Truthy값

* `true`
* `'0'`
* `[]`
* `{}`

(파이썬은 `[]`, `{}` 는 Falsy 값이다)

## 명시적 타입 변환

1. 표준 빌트인 생성자 함수를 `new` 연산자 없이 호출하는 방법
2. 빌트인 메서드를 사용하는 방법
3. 암묵적 타입 변환을 이용하는 방법

### 문자열 타입으로 변환

1. `String` 생성자 함수를 `new` 연산자 없이 호출하는 방법
2. `Object.prototype.toString` 메서드를 사용하는 방법
3. 문자열 연결 연산자를 이용하는 방법

```js
// 1.
String(...);
// 2.
(...).toString();
// 3.
(...) + '';
```

### 불리언 타입으로 변환

1. `Boolean` 생성자 함수를 `new` 연산자 없이 호출하는 방법
2. `!` 부정 논리 연산자를 두 번 사용하는 방법

```js
1.
Boolean(...)
2.
!!(...)
```

## 단축 평가

### 논리 연산자를 사용한 단축 평가

논리합(`||`)연산자 또는 논리곱(`&&`) 연산자 표현식은 언제나 2개의 피연산자 중 하나로 평가된다.

논리 연산의 결과를 결정한 피연산자를 타입 변환하지 않고 그대로 반환한다. 이를 단축평가라 한다.

```js
// 09-17-01

console.log("Cat" && "Dog") // "Dog"
console.log("Cat" || "Dog") // "Cat"
```

| 단축 평가 표현식 | 평가 결과 |
| - | - |
|`true || anything` | `true` |
|`false || anything` | `anything` |
|`true && anything` | `anything` |
|`false && anything` | `false` |

#### 객체를 가리키기를 기대하는 변수가 유효값인지 확인하고 프로퍼티를 참조할 때

```js
// 09-24

var elem = null;
// elem이 null이나 undefined와 같은 falsy 값이면 elem으로 평가되고
// elem이 Truty 값이면 elem.value로 평가된다.
var value = elem && elem.value; // -> null
```

#### 함수 매개변수에 기본값을 설정할 때

```js
// 09-25

// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
    str = str || '';
    return str.length;
}

getStringLength(); // 0
getStringLength('hi'); // 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = '') {
    return str.length;
}

getStringLength(); // 0
getStringLength('hi'); // 2
```

### 옵셔널 체이닝 연산자

옵셔널 체이닝 연산자 `?.`는 좌항의 피연산자가 `null` 또는 `undefined`인 경우 `undefined`를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

```js
// 09-26

var elem = null;

var value = elem?.value;
console.log(value); // undefined
```

논리 연산자 `&&`는 좌항 피연산자가 `false`로 평가되는 `Falsy` 값이면 좌항 피연산자를 그대로 반환한다. 하지만 `0`이나 `''`은 객체로 평가될 때도 있다.

하지만 옵셔널 체이닝 연산자 `?.`는 좌항 피연산자가 Falsy 값이라도 `null` 또는 `undefined`가 아니면 우항의 프로퍼티 참조를 이어간다.

```js
// 09-28-01

var str = '';

var length = str && str.length;
console.log(length); // ''

var length = str?.length;
console.log(length); // 0
```

### `null` 병합 연산자

`null` 병합 연산자 `??`는 좌항의 피연산자가 `null` 또는 `undefined`인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다. 변수에 기본값을 설정할 때 유용하다.

```js
// 09-30

var foo = null ?? 'default string';
console.log(foo); // default string
```

```js
// 09-31-01

var foo = '' || 'default string';
console.log(foo); // default string

var foo = '' ?? 'default string';
console.log(foo); // ''
```

논리 연산자 `||`를 사용한 단축 평가의 경우 좌항의 피연산자가 Falsy 값이면 우항의 피연산자를 반환한다. 만약 Falsy 값인 `0` 이나 `''`도 기본값으로써 유효하다면 예기치 않은 동작이 발생할 수 있다.

하지만 `null` 병합 연산자 `??`는 좌항의 피연산자가 Falsy 값이라도 `null` 또는 `undefined`가 아니면 좌항의 피연산자를 그대로 반환한다.

## 자체 문제

```js
console.log('001' > '02') // -> false
console.log(+'0xff') // -> 255

console.log("0" == 0);  // true

console.log(0 == []); // true
console.log([] == "0") // false

console.log(0 == false) // true
console.log("0" == false) // true

console.log(0 == {}) // false
```

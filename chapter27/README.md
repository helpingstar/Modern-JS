# chapter27 배열

## 배열이란?

배열 : 여러 개의 값을 순차적으로 나열한 자료 구조

* 요소 : 배열이 가지고 있는 값, 자바스크립트의 모든 값은 배열의 요소가 될 수 있다.
* 인덱스 : 배열에서 자신의 위치를 나타내는 0 이상의 정수

배열은 요소의 개수, 즉 배열의 길이를 나타내는 `length` 프로퍼티를 갖는다.

배열은 객체 타입이다.

```js
typeof arr // -> object
```

배열은 배열 리터럴, `Array` 생성자 함수, `Array.of`, `Array.from` 메서드로 생성할 수 있다. 배열의 생성자 함수는 `Array`이며 배열의 프로토타입 객체는 `Array.prototype` 이다.

```js
// 27-06

const arr = [1, 2, 3];

arr.constructor === Array // -> true
Object.getPrototypeOf(arr) === Array.prototype // -> true
```

배열은 객체지만 일반 객체와는 구별되는 독특한 특징이 있다.

| 구분 | 객체 | 배열 |
| --- | --- | --- |
| 구조 | 프로퍼티 키와 프로퍼티 값 | 인덱스와 요소 |
| 값의 참조 | 프로퍼티 키 | 인덱스 |
| 값의 순서 | X | O |
| length 프로퍼티 | X | O |

## 자바스크립트 배열은 배열이 아니다.

자바스크립트 배열은 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있다. 요소가 연속적으로 이어져 있지 않는 배열을 희소 배열이라 한다.

자바스크립트 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체다. 자바스크립트 배열은 인덱스를 나타내는 문자열을 프로퍼티 키로 가지며 `length` 프로퍼티 키를 갖는 특수한 객체다. 자바스크립트 배열의 요소는 사실 프로퍼티 값이다. 어떤 타입의 값이라도 배열의 요소가 될 수 있다.

* 일반적인 배열 : 요소에 빠르게 접근 가능, 삽입, 삭제시 효율적이지 않음
* 자바스크립트 배열 : 해시테이블로 구현, 인덱스 접근의 경우 일반적인 배열보다 느림, 삽입, 삭제시 효율적

## `length` 프로퍼티와 희소 배열

`length` 프로퍼티의 값은 0과 $2^{32} - 1$ 미만의 양의 정수다. 즉 배열은 요소를 최대 $2^{32} - 1$개 가질 수 있다.

```js
// 27-13

const arr = [1, 2, 3];
console.log(arr.length); // 3

// 요소 추가
arr.push(4);
// 요소를 추가하면 length 프로퍼티의 값이 자동 갱신된다.
console.log(arr.length); // 4

// 요소 삭제
arr.pop();
// 요소를 삭제하면 length 프로퍼티의 값이 자동 갱신된다.
console.log(arr.length); // 3
```

`length` 프로퍼티 값을 명시적으로 할당할 수 있다.

현재 `length` 프로퍼티 값보다 작은 숫자 값을 할당하면 배열의 길이가 줄어든다. 하지만 더 큰 값을 할당할 경우 `length` 프로퍼티 값은 변경되지만 배열의 길이가 늘어나지 않는다.

```js
// 27-14

const arr = [1, 2, 3, 4, 5];

// 현재 length 프로퍼티 값인 5보다 작은 숫자 값 3을 length 프로퍼티에 할당
arr.length = 3;

// 배열의 길이가 5에서 3으로 줄어든다.
console.log(arr); // [1, 2, 3]
```

```js
// 27-15

const arr = [1];

// 현재 length 프로퍼티 값인 1보다 큰 숫자 값 3을 length 프로퍼티에 할당
arr.length = 3;

// length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.
console.log(arr.length); // 3
console.log(arr); // [1, empty × 2]
```

이처럼 배열의 요소가 연속적으로 위치하지 않고 일부가 비어 있는 배열을 희소 배열이라 한다. 배열의 중간이나 앞부분이 비어 있을 수도 있다.

```js
// 27-17

// 희소 배열
const sparse = [, 2, , 4];

// 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않는다.
console.log(sparse.length); // 4
console.log(sparse); // [empty, 2, empty, 4]

// 배열 sparse에는 인덱스가 0, 2인 요소가 존재하지 않는다.
console.log(Object.getOwnPropertyDescriptors(sparse));
/*
{
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '3': { value: 4, writable: true, enumerable: true, configurable: true },
  length: { value: 4, writable: true, enumerable: false, configurable: false }
}
*/
```

일반적인 배열의 `length`는 배열 요소의 개수, 즉 배열의 길이와 언제나 일치한다. 하지만 희소 배열은 `length` 가 실제 요소 개수보다 언제나 크다.

배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선이다.

## 배열 생성

### 배열 리터럴

0개 이상의 요소를 쉼표로 구분하여 대괄호(`[]`)로 묶는다. 배열 리터럴은 프로퍼티 키가 없고 값만 존재한다.

```js
// 27-18

const arr = [1, 2, 3];
console.log(arr.length); // 3
```

배열 리터럴에 요소를 생략하면 희소 배열이 생성된다.

### `Array` 새성자 함수

`Array` 생성자 함수는 전달된 인수의 개수에 따라 다르게 동작한다.

* 전달된 인수가 1개이고 숫자인 경우 `length` 프로퍼티 값이 인수인 배열을 생성한다.
  * 이때 생성된 배열은 희소배열이다.
  * 배열은 요소를 최대 $2^{32}-1$개 가질 수 있다. 전달된 인수가 범위를 벗어나면 `RangeError`가 발생한다.
* 전달된 인수가 없는 경우 빈 배열을 생성한다.
* 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열을 생성한다.
  * `Array` 생성자 함수는 `new` 연산자와 함꼐 호출하지 안허라도 배열을 생성하는 생성자 함수로 동작한다. 이는 `Array` 생성자 함수 내부에서 `new.target`을 확인하기 때문이다.

### `Array.of`

ES6에서 도입된 `Array.of` 메서드는 전달된 인수를 요소로 갖는 배열을 생성한다. 전달된 인수가 1개이고 숫자더라도 인수를 요소로 갖는 배열을 생성한다.

```js
// 27-27

// 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
Array.of(1); // -> [1]

Array.of(1, 2, 3); // -> [1, 2, 3]

Array.of('string'); // -> ['string']
```

### `Array.from`

`Array.from` 메서드는 유사 배열 객체 또는 이터러블을 인수로 전달받아 배열로 변환하여 반환한다.

```js
// 27-28

// 유사 배열 객체를 변환하여 배열을 생성한다.
Array.from({ length: 2, 0: 'a', 1: 'b' }); // -> ['a', 'b']

// 이터러블을 변환하여 배열을 생성한다. 문자열은 이터러블이다.
Array.from('Hello'); // -> ['H', 'e', 'l', 'l', 'o']
```

`Array.from` 메서드는 두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값곽 인덱스를 순차적으로 전달하면서 호출하고, 콜백 함수의 반환값으로 구성된 배열을 반환한다.

```js
// 27-29

// Array.from에 length만 존재하는 유사 배열 객체를 전달하면 undefined를 요소로 채운다.
Array.from({ length: 3 }); // -> [undefined, undefined, undefined]

// Array.from은 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환한다.
Array.from({ length: 3 }, (_, i) => i); // -> [0, 1, 2]
```

### 배열 요소의 참조

배열 요소를 참조할 때 대괄호(`[]`) 표기법을 사용한다. 대괄호 안에는 인덱스가 와야 한다. 존재하지 않는 요소에 접근하면 `undefined`가 반환된다.

배열은 인덱스를 나타내는 문자열을 프로퍼티 키로 갖는 객체다. 따라서 존재하지 않는 프로퍼티 키로 객체의 프로퍼티에 접근했을 때 `undefined`를 반환하는 것처럼 배열도 `undefined`를 반환한다.

희소 배열의 존재하지 않는 요소를 참조해도 `undefined`를 반환한다.

## 배열 요소의 추가와 갱신

존재하지 않는 인덱스를 사용해 값을 할당하면 새로운 요소가 추가된다.

현재 배열의 `length` 프로핕 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.

```js
// 27-35

arr[100] = 100;

console.log(arr); // [0, 1, empty × 98, 100]
console.log(arr.length); // 101
```

이때 인덱스로 요소에 접근하여 명시적으로 값을 할당하지 않은 요소는 생성되지 않는다.

```js
// 27-36

// 명시적으로 값을 할당하지 않은 요소는 생성되지 않는다.
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': {value: 0, writable: true, enumerable: true, configurable: true},
  '1': {value: 1, writable: true, enumerable: true, configurable: true},
  '100': {value: 100, writable: true, enumerable: true, configurable: true},
  length: {value: 101, writable: true, enumerable: false, configurable: false}
*/
```

정수 이외의 값을 인덱스처럼 사용하면 프로퍼티가 생성된다. 이때 추가된 프로퍼티는 `lnegth` 프로퍼티 값에 영향을 주지 않는다.

```js
// 27-38

const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr.bar = 4;
arr[1.1] = 5;
arr[-1] = 6;

console.log(arr); // [1, 2, foo: 3, bar: 4, '1.1': 5, '-1': 6]

// 프로퍼티는 length에 영향을 주지 않는다.
console.log(arr.length); // 2
```

## 배열 요소의 삭제

배열은 사실 객체이기 때문에 배열의 특정 요소를 삭제하기 위해 `delete` 연산자를 사용할 수 있다. 이때 배열은 희소배열이 되며 `length` 프로퍼티 값은 변하지 않는다. 따라서 사용하지 않는 것이 좋다.

```js
// 27-39

const arr = [1, 2, 3];

// 배열 요소의 삭제
delete arr[1];
console.log(arr); // [1, empty, 3]

// length 프로퍼티에 영향을 주지 않는다. 즉, 희소 배열이 된다.
console.log(arr.length); // 3
```

희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하려면 `Array.prototype.splice` 메서드를 사용한다.

```js
// 27-40

const arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
// arr[1]부터 1개의 요소를 제거
arr.splice(1, 1);
console.log(arr); // [1, 3]

// length 프로퍼티가 자동 갱신된다.
console.log(arr.length); // 2
```

## 배열 메서드

배열 메서드는 결과물을 반환하는 패턴이 두 가지이므로 주의가 필요하다

* 원본 배열을 직접 변경하는 메서드
* 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드
  * 가급적 원본 배열을 직접 변경하지 않는 메서드를 사용하는 편이 좋다.

### `Array.isArray`

전달된 인수가 배열이면 `true`, 배열이 아니면 `false`를 반환한다.

### `Array.prototype.indexOf`

`indexOf` 메서드는 인수로 전달된 요소를 검색하여 인덱스를 반환한다. 

* 여러 개 있다면 첫 번째로 검색된 요소의 인덱스를 반환한다.
* 원본 배열에 인수로 전달할 요소가 존재하지 않으면 `-1`을 반환한다.

### `Array.prototype.push`

인수로 전달받은 모든 값을 원본 배열의 마짐가 요소로 추가하고 변경된 `length` 프로퍼티 값을 반환한다. (원본 배열 직접 변경)

마지막 요소로 추가할 요소가 하나뿐이라면 `length` 프로퍼티를 사용하여 배열의 마지막 요소에 직접 추가할 수도 있다. 이 방법이 `push` 메서드보다 빠르다.

### `Array.prototype.pop`

원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다. 원본 배열이 빈 배열이면 `undefined`를 반환한다. (원본 배열 직접 변경)

### `Array.prototype.unshift`

인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 `length` 프로퍼티 값을 반환한다. (원본 배열 직접 변경)

### `Array.prototype.shift`

원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다. 원본 배열이 빈 배열이면 `undefined`를 반환한다. (원본 배열 직접 변경)

### `Array.prototype.concat`

`concat` 메서드는 인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다. (원본 배열 직접 변경하지 않음)

`push`와 `unshift` 메서드는 `concat` 메서드로 대체할 수 있다.

```js
// 27-58

const arr1 = [3, 4];

// unshift 메서드는 원본 배열을 직접 변경한다.
// 따라서 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없다.
arr1.unshift(1, 2);
// unshift 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인할 수 있다.
console.log(arr1); // [1, 2, 3, 4]

// push 메서드는 원본 배열을 직접 변경한다.
// 따라서 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없다.
arr1.push(5, 6);
// push 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인할 수 있다.
console.log(arr1); // [1, 2, 3, 4, 5, 6]

// unshift와 push 메서드는 concat 메서드로 대체할 수 있다.
const arr2 = [3, 4];

// concat 메서드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다.
// arr1.unshift(1, 2)를 다음과 같이 대체할 수 있다.
let result = [1, 2].concat(arr2);
console.log(result); // [1, 2, 3, 4]

// arr1.push(5, 6)를 다음과 같이 대체할 수 있다.
result = result.concat(5, 6);
console.log(result); // [1, 2, 3, 4, 5, 6]
```

인수로 전달받은 값이 배열인 경우 `push`, `unshift` 메서드는 배열을 그대로 원본 배열의 마지막/첫 번째 요소로 추가하지만 `concat` 메서드는 배열을 해체하여 새로운 배열의 마지막 요소로 추가한다.

```js
// 27-59

const arr = [3, 4];

// unshift와 push 메서드는 인수로 전달받은 배열을 그대로 원본 배열의 요소로 추가한다
arr.unshift([1, 2]);
arr.push([5, 6]);
console.log(arr); // [[1, 2], 3, 4,[5, 6]]

// concat 메서드는 인수로 전달받은 배열을 해체하여 새로운 배열의 요소로 추가한다
let result = [1, 2].concat([3, 4]);
result = result.concat([5, 6]);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

### `Array.prototype.splice`

`splice` 메서드는 원본 배열의 중간에 요소를 추가하거나 삭제한다. (원본 배열 직접 변경)

* `start` : 원본 배열의 요소를 제거하기 시작할 인덱스. 음수인 경우 배열의 끝에서 인덱스를 나타낸다.
* `deleteCount` : 제거할 요소의 수. 생략하면 `start`부터 배열의 끝까지 제거한다.
* `items` : 제거한 위치에 삽입할 요소들의 목록. 생략시 원본 배열에서 요소들을 제거하기만 한다.

### `Array.prototype.slice`

* `start` : 복사를 시작할 인덱스. 음수인 경우 배열의 끝에서 인덱스를 나타낸다.
* `end` : 복사를 종료할 인덱스. 이 인덱스에 해당하는 요소는 복사되지 않는다. 생략시 기본값은 `length` 프로퍼티 값

이떄 생성된 복사본은 앝은 복사를 통해 생성된다.

```js
// 27-71

const todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
];

// 얕은 복사(shallow copy)
const _todos = todos.slice();
// const _todos = [...todos];

// _todos와 todos는 참조값이 다른 별개의 객체다.
console.log(_todos === todos); // false

// 배열 요소의 참조값이 같다. 즉, 얕은 복사되었다.
console.log(_todos[0] === todos[0]); // true
```

`slice` 메서드가 복사본을 생성하는 것을 이용하여 유사 배열 객체를 배열로 변환할 수 있다.

### `Array.prototype.join`

`join` 메서드는 배열의 모든 요소를 문자열로 변환한 후 인수로 전달받은 문자열, 즉 구분자로 연결한 문자열을 반환한다. 기본 구분자는 콤마(`,`)이다.

### `Array.prototype.reverse`

`reverse` 메서드는 원본 배열의 순서를 반대로 뒤집는다. (원본 배열 직접 변경)

### `Array.prototype.fill`

`fill` 메서드는 인수로 전달받은 값을 배열의 `start` 부터 `end`까지 요소로 채운다. (원본 배열 직접 변경)

### `Array.prototype.includes`

`includes` 메서드는 인수로 전달된 요소가 배열에 존재하면 `true`, 존재하지 않으면 `false`를 반환한다.

첫번째 인수로 검색할 대상을 지정한다. 두 번째 인수로 검색을 시작할 인덱스를 지정할 수 있다. 두 번째 인수를 생략하면 배열의 처음부터 검색한다. 음수인 경우 배열의 끝에서부터 인덱스를 나타낸다.

### `Array.prototype.flat`

`flat` 메서드는 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화한다. 기본값은 1이다.

## 배열 고차 함수

고차함수는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다. 고차 함수는 외부 상태의 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에 기반을 두고 있다.

함수형 프로그래밍은 순수 함수와 보조 함수의 조합을 통해 로직 내에 존재하는 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피하려는 프로그래밍 피러다임이다.  순수 함수를 통해 부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이려는 노력의 일환이다.

### `Array.prototype.sort`

`sort` 메서드는 배열의 요소를 정렬한다. 원본 배열을 직접 변경하며 정렬된 배열을 반환한다.

기본적으로 오름차순으로 요소를 정렬한다.

숫자 요소를 정렬할 때는 정렬 순서를 정의한느 비교 함수를 인수로 전달해야 한다. 비교 함수는 양수나 음수 또는 0을 반환해야 한다.

* 비교 함수의 반환값이 0보다 작은 경우,첫 번째 인수를 우선하여 정렬한다.
* 비교 함수의 반환값이 0보다 큰 경우, 두 번째 인수를 우선하여 정렬한다.
* 비교 함수의 반환값이 0인 경우, 순서를 변경하지 않는다.

```js
// 27-93

const points = [40, 100, 1, 5, 2, 25, 10];

// 숫자 배열의 오름차순 정렬. 비교 함수의 반환값이 0보다 작으면 a를 우선하여 정렬한다.
points.sort((a, b) => a - b);
console.log(points); // [1, 2, 5, 10, 25, 40, 100]

// 숫자 배열에서 최소/최대값 취득
console.log(points[0], points[points.length]); // 1

// 숫자 배열의 내림차순 정렬. 비교 함수의 반환값이 0보다 크면 b를 우선하여 정렬한다.
points.sort((a, b) => b - a);
console.log(points); // [100, 40, 25, 10, 5, 2, 1]

// 숫자 배열에서 최대값 취득
console.log(points[0]); // 100
```

```js
// 27-94

const todos = [
  { id: 4, content: 'JavaScript' },
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' }
];

// 비교 함수. 매개변수 key는 프로퍼티 키다.
function compare(key) {
  // 프로퍼티 값이 문자열인 경우 - 산술 연산으로 비교하면 NaN이 나오므로 비교 연산을 사용한다.
  // 비교 함수는 양수/음수/0을 반환하면 되므로 - 산술 연산 대신 비교 연산을 사용할 수 있다.
  return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
}

// id를 기준으로 오름차순 정렬
todos.sort(compare('id'));
console.log(todos);
/*
[
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' },
  { id: 4, content: 'JavaScript' }
]
*/

// content를 기준으로 오름차순 정렬
todos.sort(compare('content'));
console.log(todos);
/*
[
  { id: 2, content: 'CSS' },
  { id: 1, content: 'HTML' },
  { id: 4, content: 'JavaScript' }
]
*/
```

### `Array.prototype.forEach`

`forEach` 메서드는 자신의 내부에서 반복문을 실행한다. 즉, 반복문을 추상화한 고차함수로서 내부에서 반복문을 통해 잣니을 호출한 배열을 순회하면서 수행해야할 처리를 콜백함수로 전달받아 반복 호출한다.

`forEach` 메서드는 콜백함수를 호출할 때 3개의 인수, 즉 `forEach` 메서드를 호출한 배열의 요소값과 인덱스, `forEach` 메서드를 호출한 배열(`this`)을 순차적으로 전달한다.

### `Array.prototype.map`

`map` 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다. 이때 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다. (원본 배열 직접 변경하지 않음)

`forEach` 메서드와 `map` 메서드의 공통점은 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다는 것이다. 하지만 `forEach` 메서드는 언제나 `undefined`를 반환하고 `map` 메서드는 코랩ㄱ 함수의 반환값들로 구성된 새로운 배열을 반환하는 차이가 있다.

### `Array.prototype.filter`

`filter` 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다. 그리고 콜백 함수의 반환값이 `true`인 요소로만 구성된 새로운 배열을 반환한다. (원본 배열 직접 변경하지 않음)

### `Array.prototype.reduce`

`reduce` 메서드는 자신을 호출한 배열을 모든 요소를 순회하며 인수로 전달받은 콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달하면서 콜백 함수를 호출하여 하나의 결과값을 만들어 반환한다.

`reduce` 메서드는 첫 번째 인수로 콜백 함수, 두 번째 인수로 초기값을 전달받는다. `reduce` 메서드의 콜백 함수에는 4개의 인수, 초기값 또는 콜백 함수의 이전 반환값, `reduce` 메서드를 호출한 배열의 요소값과 인덱스, `reduce` 메서드를 호출한 배열 자체, 즉 `this`가 전달된다.

### `Array.prototype.some`

`some` 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백함수를 호출하는데 콜백 함수의 반환값이 단 한 번이라도 참이면 `true`, 모두 거짓이면 `false`를 반환한다.

호출한 배열이 빈 배열일 경우 `false`를 반환한다.

### `Array.prototype.every`

`every` 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백함수를 호출하는데 콜백 함수의 반환값이 모두 참이면 `true`, 단 한 번이라도 거짓이면 `false`를 반환한다.

호출한 배열이 빈 배열일 경우 `true`를 반환한다.

### `Array.prototype.find`

`find` 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백함수를 호출하는데 콜백 함수의 반환값이 `true`인 첫 번째 요소를 반환한다. 만약 콜백 함수의 반환값이 `true`인 요소가 없다면 `undefined`를 반환한다.

### `Array.prototype.findIndex`

`findIndex` 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백함수를 호출하는데 콜백 함수의 반환값이 `true`인 첫 번째 요소의 인덱스를 반환한다. 만약 콜백 함수의 반환값이 `true`인 요소가 없다면 `-1`를 반환한다.

### `Array.prototype.flatMap`

`flatMap` 메서드는 `map` 메서드를 통해 생성된 배열을 평탄화한다. 즉, `map` 메서드와 `flat` 메서드를 순차적으로 실행하는 효과가 있다.

```js
// 27-133

const arr = ['hello', 'world'];

// map과 flat을 순차적으로 실행
arr.map(x => x.split('')).flat();
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화한다.
arr.flatMap(x => x.split(''));
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
```

단 `flatMap` 메서드는 `flat` 메서드처럼 인수를 전달하여 평탄화 깊이를 지정할 수는 없고 1단계만 평탄화한다. `map` 메서드를 통해 생성된 중첩 배열의 평탄화 깊이를 지정해야 하면 `map` 메서드와 `flat` 메서드를 각각 호출한다.

```js
// 27-134

const arr = ['hello', 'world'];

// flatMap은 1단계만 평탄화한다.
arr.flatMap((str, index) => [index, [str, str.length]]);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, ['hello', 5], 1, ['world', 5]]

// 평탄화 깊이를 지정해야 하면 flatMap 메서드를 사용하지 말고 map 메서드와 flat 메서드를 각각 호출한다.
arr.map((str, index) => [index, [str, str.length]]).flat(2);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, 'hello', 5, 1, 'world', 5]
```

## 문제

```js
const arr = [1, 2, 3, 4, 5];

// 현재 length 프로퍼티 값인 5보다 작은 숫자 값 3을 length 프로퍼티에 할당
arr.length = 3;

// 배열의 길이가 5에서 3으로 줄어든다.
console.log(arr); // [1, 2, 3]

arr.length = 4;

console.log(arr);
```

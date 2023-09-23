# chapter31 RegExp

## 정규표현식이란?

정규표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어다.

정규 표현식은 문자열을 대상으로 패턴 매칭 기능을 제공한다.

```js
// 31-01

// 사용자로부터 입력받은 휴대폰 전화번호
const tel = '010-1234-567팔';

// 정규 표현식 리터럴로 휴대폰 전화번호 패턴을 정의한다.
const regExp = /^\d{3}-\d{4}-\d{4}$/;

// tel이 휴대폰 전화번호 패턴에 매칭하는지 테스트(확인)한다.
regExp.test(tel); // -> false
```

## 정규표현식의 생성

정규 표현식 객체를 생성하기 위해서는 정규 표현식 리터럴과 `RegExp` 생성자 함수를 사용할 수 있다.

일반적인 방법은 정규 표현식 리터럴을 사용하는 것이다. 정규 표현식 리터럴은 다음과 같이 표현한다.

```text
┌start ┌end
/regexp/i┐
 └pattern└flag
```

```js
// 31-02

const target = 'Is this all there is?';

// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색한다.
const regexp = /is/i;

// test 메서드는 target 문자열에 대해 정규표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
regexp.test(target); // -> true
```

`RegExp` 생성자 함수를 사용하여 `RegExp` 객체를 생성할 수도 있다.

```js
/**
 * pattern : 정규 표현식의 패턴
 * flags : 정규 표현식의 플래그
 */

new RegExp(pattern[, flags]);
```

```js
// 31-03

const target = 'Is this all there is?';

const regexp = new RegExp(/is/i); // ES6
// const regexp = new RegExp(/is/, 'i');
// const regexp = new RegExp('is', 'i');

regexp.test(target); // -> true
```

`RegExp` 생성자 함수를 사용하면 변수를 사용해 동적으로 `RegExp` 객체를 생성할 수 있다.

```js
// 31-04

const count = (str, char) => (str.match(new RegExp(char, 'gi')) ?? []).length;

count('Is this all there is?', 'is'); // -> 3
count('Is this all there is?', 'xx'); // -> 0
```

## `RegExp` 메서드

### `RegExp.prototype.exec`

`exec` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다. 매칭 결과가 없을 경우 `null`을 반환한다.

문자열 내의 모든 패턴을 검색하는 `g` 플래그를 지정해도 첫 번째 매칭 결과만 반환한다.

```js
// 31-05

const target = 'Is this all there is?';
const regExp = /is/;

regExp.exec(target); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

### `RegExp.prototype.test`

`test` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.

```js
// 31-06

const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target); // -> true
```

### `String.prototype.match`

`String` 표준 빌트인 객체가 제공하는 `match` 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.

```js
// 31-07

const target = 'Is this all there is?';
const regExp = /is/;

target.match(regExp); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

`g` 플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.

```js
// 31-08

const target = 'Is this all there is?';
const regExp = /is/g;

target.match(regExp); // -> ["is", "is"]
```

## 플래그

정규 표현식의 검색 방식을 설정하기 위해 사용한다.

| 플래그 | 의미 | 설명 |
| --- | --- | --- |
| `i` | ignore case | 대소문자를 구별하지 않고 패턴을 검색한다. |
| `g` | global | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다. |
| `m` | multiline | 문자열의 행이 바뀌더라도 패턴 검색을 계속한다. |

## 패턴

정규 표현식의 검색 방식을 설정하기 위해 사용한다.

패턴은 `/`로 열고 닫으며 문자열의 따옴표는 생략한다. 또한 패턴은 특별한 의미를 가지는 메타문자 또는 기호로 표현할 수 있다.

### 문자열 검색

```js
// 31-10-01

const target = 'Is this all there is?';

// 'is' 문자열과 매치하는 패턴. 플래그가 생략되었으므로 대소문자를 구별한다.
const regExp1 = /is/;

// target과 정규 표현식이 매치하는지 테스트한다.
regExp1.test(target); // -> true

// target과 정규 표현식의 매칭 결과를 구한다.
target.match(regExp1);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// 'is' 문자열과 매치하는 패턴. 플래그 i를 추가하면 대소문자를 구별하지 않는다.
const regExp2 = /is/i;

target.match(regExp2);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// 'is' 문자열과 매치하는 패턴.
// 플래그 g를 추가하면 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
const regExp3 = /is/ig;

target.match(regExp3); // -> ["Is", "is", "is"]
```

### 임의의 문자열 검색

`.`은 임의의 문자 한 개를 의미한다.

```js
// 31-13

const target = 'Is this all there is?';

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp = /.../g;

target.match(regExp); // -> ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
```

### 반복 검색

`{m, n}`은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다. 콤마 뒤에 공백이 있으면 정상 동작하지 않는다.

```js
// 31-14

const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;

target.match(regExp); // -> ["A", "AA", "A", "AA", "A"]
```

* `{n}` : 앞선 패턴이 `n`번 반복되는 문자열을 의미한다. `{n}`은 `{n,n}`과 같다.
* `{n,}` : 앞선 패턴이 최소 `n`번 이상 반복되는 문자열을 의미한다.
* `+` : 앞선 패턴이 최소 1번 이상 반복되는 문자열을 의미한다. `{1,}`은 `+`와 같다.
* `?` : 앞선 패턴이 최대 1번까지만 반복되는 문자열을 의미한다. `{0,1}`은 `?`와 같다.

```js
// 31-15-01

const target = 'A AA B BB Aa Bb AAA';

// 'A'가 2번 반복되는 문자열을 전역 검색한다.
const regExp1 = /A{2}/g;
target.match(regExp1); // -> ["AA", "AA"]

// 'A'가 최소 2번 이상 반복되는 문자열을 전역 검색한다.
const regExp2 = /A{2,}/g;
target.match(regExp2); // -> ["AA", "AAA"]

// 'A'가 최소 한 번 이상 반복되는 문자열('A, 'AA', 'AAA', ...)을 전역 검색한다.
const regExp3 = /A+/g;
target.match(regExp3); // -> ["A", "AA", "A", "AAA"]

// 'colo' 다음 'u'가 최대 한 번(0번 포함) 이상 반복되고 'r'이 이어지는 문자열 'color', 'colour'를 전역 검색한다.
const regExp4 = /colou?r/g;
target.match(regExp4); // -> ["color", "colour"]
```

### OR 검색

`|`은 or의 의미를 갖는다. 분해되지 않은 단어 레벨로 검색하기 위해서는 `+`를 함께 사용한다.

```js
// 31-19

const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'를 전역 검색한다.
const regExp = /A|B/g;

target.match(regExp); // -> ["A", "A", "A", "B", "B", "B", "A", "B"]
```

```js
// 31-20

const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regExp = /A+|B+/g;

target.match(regExp); // -> ["A", "AA", "B", "BB", "A", "B"]
```

`[]`내의 문자는 or로 동작한다. 그 뒤에 `+`를 사용하면 앞선 패턴을 한 번 이상 반복한다. `31-20`은 `31-21`과 같다.

```js
// 31-21

const target = 'A AA B BB Aa Bb';

// 'A' 또는 'B'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regExp = /[AB]+/g;

target.match(regExp); // -> ["A", "AA", "B", "BB", "A", "B"]
```

범위를 지정하려면 `[]`내에 `-`를 사용한다. 대문자 알파벳을 검색할 경우 `[A-Z]`, 대소문자를 구별하지 않고 알파벳을 검색할 경우 `[A-Za-z]`를 사용한다.

숫자를 검색할 경우 `[0-9]`를 사용한다. `[0-9]`는 `\d`와 같다. `\D`는 숫자가 아닌 문자를 의미한다.

`\w`는 알파벳, 숫자, 언더스코어를 의미한다. 즉 `[A-Za-z0-9_]`와 같다. `\W`는 알파벳, 숫자, 언더스코어가 아닌 문자를 의미한다.

### NOT 검색

`[...]` 내의 `^`은 not의 의미를 갖는다.

* `[^0-9]` == `\D`
* `[^A-Za-z0-9_]` == `\W`

### 시작 위치로 검색

`[...]` 밖의 `^`은 시작을 의미한다.

```js
// 31-29

const target = 'https://poiemaweb.com';

// 'https'로 시작하는지 검사한다.
const regExp = /^https/;

regExp.test(target); // -> true
```

### 마지막 위치로 검색

`$`은 문자열의 마지막을 의미한다.

```js
// 31-30

const target = 'https://poiemaweb.com';

// 'com'으로 끝나는지 검사한다.
const regExp = /com$/;

regExp.test(target); // -> true
```

## 자주 사용하는 정규표현식

```js
// 'http://' 또는 'https://'로 시작하는지 검사한다.
/^https?:\/\//;
/^(http|https):\/\//;

// 'html'로 끝나는지 검사한다.
/html$/;

// 숫자로만 이루어진 문자열인지 검사한다.
/^\d+$/;

// 하나 이상의 공백으로 시작하는지 검사한다.
/^[\s]+/;

// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~ 10자리인지 검사한다.
/^[A-Za-z0-9]{4,10}$/;

// 메일 주소 형식에 맞는지 검사
/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// 핸드폰 번호 형식에 맞는지 검사
/^\d{3}-\d{3,4}-\d{4}$/

// A-Za-z0-9 이외의 문자가 있는지 검사한다.
(/[^A-Za-z0-9]/gi);
(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
```
# chatper48 모듈

## 모듈의 일반적 의미

모듈 : 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각. 일반적으로 모듈은 기능을 기준으로 파일 단위로 분리한다. 이때 모듈이 성립하려면 모듈은 자기만의 파일 스코프(모듈 스코프) 를 가질 수 있어야 한다.

자신만의 파일 스코프를 갖는 모듈의 자산(변수, 함수, 객체)은 기본적으로 비공개상태다. 다시 말해, 자신만의 파일 스코프를 갖는 모듈의 모든 자산은 캡슐화되어 다른 모듈에서 접근할 수 없다. 즉, 모듈은 개별적 존재로서 애플리케이션과 분리되어 존재한다.

하지만 애플리케이션과 완전히 분리되어 개별적으로 존재하는 모듈은 재사용이 불가능하므로 존재의 의미가 없다. 모듈은 애플리케이션이나 다른 모듈에 의해 재사용되어야 의미가 있다. 따라서 모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개가 가능하다. 이를 export라 한다.

공개(export)된 모듈의 자산은 다른 모듈에서 재사용할 수 있다. 이때 공개된 모듈의 자산을 사용하는 모듈을 모듈 사용자(module consumer)라 한다. 모듈 사용자는 모듈이 공개(export)한 자산 중 일부 또는 전체를 선택해 자신의 스코프 내로 불러들여 재사용할 수 있다. 이를 import 라 한다.

![48-01](../images/48-01.jpg)

## 자바스크리븥와 모듈

자바스크립트는 모듈이 성립하기 위해 필요한 파일 스코프와 improt, export를 지원하지 않는다.

자바스크릡트 파일을 여러 개의 파일로 분리하여 `script` 태그로 로드해도 분리된 자바스크립트 파일들은 결국 하나의 자바스크립트 파일 내에 있는 것처럼 동작한다. 즉, 모든 자바스크립트 파일은 하나의 전역을 공유한다. 따라서 전역 변수가 중복되는 등의 문제가 발생할 수 있다.

자바스크립트 런타임 환경인 Node.js는 CommonJS를 채택했고 현재는 진화를 거쳐 기본적인 CommonJS  사양을 따른다. 즉, Node.js는 ECMAScript 표준 사양은 아니지만 모듈 시스템을 지원한다. 따라서 Node.js 환경에서는 파일별로 독립적인 파일 스코프(모듈 스코프)를 갖는다.

## ES6 모듈

ES6에서는 클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능을 추가했다. `script` 태그에 `type="module"` 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다. ESM을 명확히 하기 위해 ESM의 파일 확장자는 `mjs`를 사용할 것을 권장한다.

```html
<!-- 48-01 -->
<script type="module" src="app.mjs"></script>
```
ESM에는 클래스와 마찬가지로 기본적으로 strict mode가 적용된다.

### 모듈 스코프

ESM은 독자적인 모듈 스코프를 갖는다. ESM이 아닌 일반적인 자바스크립트 파일은 `script` 태그로 분리해서 로드해도 독자적인 모듈 스코프를 갖지 않는다.

```js
// 48-02

// foo.js
// x 변수는 전역 변수다.
var x = 'foo';
console.log(window.x); // foo
```

```js
// 48-03

// bar.js
// x 변수는 전역 변수다. foo.js에서 선언한 전역 변수 x와 중복된 선언이다.
var x = 'bar';

// foo.js에서 선언한 전역 변수 x의 값이 재할당되었다.
console.log(window.x); // bar
```

```html
<!-- 48-04 -->
<!DOCTYPE html>
<html>
<body>
  <script src="foo.js"></script>
  <script src="bar.js"></script>
</body>
</html>
```

위 예제의 HTML에서 `script` 태그로 분리해서 로드된 2개의 자바스크립트 파일은 하나의 자바스크립트 파일 내에 있는 것처럼 동작한다. 즉, 하나의 전역을 공유한다. 따라서 `foo.js`에서 선언한 `x` 변수와 `bar.js`에서 선언한 `x` 변수는 중복 선언되며 의도치 않게 `x` 변수의 값이 덮어써진다.

ESM은 파일 자체의 독자적인 모듈 스코프를 제공한다. 따라서 모듈 내에서 `var` 키워드로 선언한 변수는 더는 전역 변수가 아니며 `window` 객체의 프로퍼티도 아니다.

```js
// 48-05

// foo.mjs
// x 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
var x = 'foo';
console.log(x); // foo
console.log(window.x); // undefined
```

```js
// 48-06

// bar.mjs
// x 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
// foo.mjs에서 선언한 x 변수와 스코프가 다른 변수다.
var x = 'bar';
console.log(x); // bar
console.log(window.x); // undefined
```

```html
<!-- 48-07 -->

<!DOCTYPE html>
<html>
<body>
  <script type="module" src="foo.mjs"></script>
  <script type="module" src="bar.mjs"></script>
</body>
</html>
```

모듈 내에서 선언한 식별자는 모듈 외부에서 참조할 수 없다. 모듈 스코프가 다르기 때문이다.
```js
// 48-08

// foo.mjs
const x = 'foo';
console.log(x); // foo
```
```js
// 48-09

// bar.mjs
console.log(x); // ReferenceError: x is not defined
```

```html
<!-- 48-10 -->

<!DOCTYPE html>
<html>
<body>
  <script type="module" src="foo.mjs"></script>
  <script type="module" src="bar.mjs"></script>
</body>
</html>
```

### export 키워드

모듈은 독자적인 모듈 스코프를 갖는다. 따라서 모듈 내부에서 선언한 모든 식별자는 기본적으로 해당 모듈 내부에서만 참조할 수 있다. 모듈 내부에서 선언한 식별자를 외부에 공개하여 다른 모듈들이 재사용할 수 있게 하려면 `export` 키워드를 사용한다.

`export` 키워드는 선언문 앞에 사용한다. 이로써 변수, 함수, 클래스 등 모든 식별자를 export 할 수 있다.

```mjs
// 48-11

// lib.mjs
// 변수의 공개
export const pi = Math.PI;

// 함수의 공개
export function square(x) {
  return x * x;
}

// 클래스의 공개
export class Person {
  constructor(name) {
    this.name = name;
  }
}
```

선언문 앞에 매번 `export` 키워드를 붙이는 것이 번거롭다면 export 할 대상을 하나의 객체로 구성하여 한 번에 export 할 수도 있다.

```mjs
// 48-12

// lib.mjs
const pi = Math.PI;

function square(x) {
  return x * x;
}

class Person {
  constructor(name) {
    this.name = name;
  }
}

// 변수, 함수 클래스를 하나의 객체로 구성하여 공개
export { pi, square, Person };
```

### import 키워드

다른 모듈에서 공개(export)한 식별자를 자신의 모듈 스코프 내부로 로드하려면 `import` 키워드를 사용한다. 다른 모듈이 export한 식별자 이름으로 import 해야 하며 ESM의 경우 파일 확장자를 생략할 수 있다.

```mjs
// 48-13

// app.mjs
// 같은 폴더 내의 lib.mjs 모듈이 export한 식별자 이름으로 import한다.
// ESM의 경우 파일 확장자를 생략할 수 없다.
import { pi, square, Person } from './lib.mjs';

console.log(pi);         // 3.141592653589793
console.log(square(10)); // 100
console.log(new Person('Lee')); // Person { name: 'Lee' }
```

```html
<!-- 48-14 -->

<!DOCTYPE html>
<html>
<body>
  <script type="module" src="app.mjs"></script>
</body>
</html>
```

위 예제의 `app.mjs`는 애플리케이션의 진입점(entry point)이므로 반드시 `script` 태그로 로드해야 한다. 하지만 `lib.mjs`는 `app.mjs`의 `import` 문에 의해 로드되는 의존성(dependency)이다. 따라서 `lib.mjs`는 `script` 태그로 로드하지 않아도 된다.

모듈이 export한 식별자 이름을 일일이 지정하지 않고 하나의 이름으로 한 번에 import 할 수도 있다. 이때 import 되는 식별자는 `as` 뒤에 지정한 이름의 객체에 프로퍼티로 할당된다.

```mjs
// 48-15

// app.mjs
// lib.mjs 모듈이 export한 모든 식별자를 lib 객체의 프로퍼티로 모아 import한다.
import * as lib from './lib.mjs';

console.log(lib.pi);         // 3.141592653589793
console.log(lib.square(10)); // 100
console.log(new lib.Person('Lee')); // Person { name: 'Lee' }
```

모듈이 export한 식별자 이름을 변경하여 import 할 수도 있다.

```mjs
// 48-16

// app.mjs
// lib.mjs 모듈이 export한 식별자 이름을 변경하여 import한다.
import { pi as PI, square as sq, Person as P } from './lib.mjs';

console.log(PI);    // 3.141592653589793
console.log(sq(2)); // 4
console.log(new P('Kim')); // Person { name: 'Kim' }
```

모듈에서 하나의 값만 export 한다면 `default` 키워드를 사용할 수 있다. `default` 키워드를 사용하는 경우 기본적으로 이름 없이 하나의 값을 export 한다.

```mjs
// 48-17

// lib.mjs
export default x => x * x;
```

`default` 키워드를 사용하는 경우 `var`, `let`, `const` 키워드는 사용할 수 없다.

```mjs
// 48-18

// lib.mjs
export default const foo = () => {};
// => SyntaxError: Unexpected token 'const'
// export default () => {};
```

`default` 키워드와 함께 export한 모듈은 `{}` 없이 임의의 이름으로 import 한다.

```mjs
// 48-19

// app.mjs
import square from './lib.mjs';

console.log(square(3)); // 9
```

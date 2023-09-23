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
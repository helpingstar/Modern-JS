// 31-15

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
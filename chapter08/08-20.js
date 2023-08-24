// 08-20

// foo라는 식별자가 붙은 레이블 블록문
foo: {
    console.log(1);
    break foo;
    console.log(2);
}

console.log('Done!');

// [OUTPUT]
// 1
// Done!

// 25-42-01

class Person {
    // 클래스 필드
    name = 'Lee';

    constructor() {
        console.log(this.name); // Lee
        console.log(name); // ReferenceError: name is not defined
    }
}

new Person();
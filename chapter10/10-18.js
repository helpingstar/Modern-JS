// 10-18

var person = {
    name: "Lee"
};

person.age = 20;

delete person.age;
delete person.address;

console.log(person); // {name: "Lee"}

// 19-63-01

const person = { name: 'Lee' };

console.log(person.hasOwnProperty('name')); // true
console.log(person.hasOwnProperty('age'));  // false

console.log(person.hasOwnProperty('toString')); // false
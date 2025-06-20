// variable declaration and initialization.
var a = 22;
var b = 18;

// using if-else statement to check voting eligibility
if (a > b) {
    console.log("your eligibile for voting");
} else {
    console.log("your not eligibile for voting");
};

console.log("\n");

//using constants
const c = "ketan";

console.log(c);

// c = "world";  This will cause an error because 'c' is a constant.

console.log("\n");

// array declaration and initialization

var arr = [10, 20, 30, 40, 50];
// using for loop to iterate through the array
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

console.log("\n");

// object declaration and initialization
var obj = {
    f_name: "ketan",
    l_name: "tejam",
    age: 22
};
// using for-in loop to iterate through the object
for (var key in obj) {
    console.log(key + ": " + obj[key]);
}

console.log("\n");

// function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// using/calling the function
console.log(greet("Ketan"));

console.log("\n");

//user input using prompt
var prompt = require('prompt-sync')(); // using prompt-sync for user input in Node.js

var userName = prompt("Enter your name: ");

var age = prompt("Enter your age: ");

// displaying user input
console.log("User Name: " + userName);
console.log("Age: " + age);

console.log("\n");
// using template literals for string interpolation
console.log(`User Name: ${userName}, Age: ${age}`);

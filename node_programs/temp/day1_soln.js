//soln 1:

var prompt = require('prompt-sync')(); // using prompt-sync for user input in Node.js
var userName = prompt("Enter your name: ");
var age = prompt("Enter your age: ");

if (age < 18) {
    console.log(`${userName}, You'll get a 20% discount.`);
} else if (age >= 18 && age < 65) {
    console.log(`${userName}, No discount available sorry.`);
} else {
    console.log(`${userName}, You'll get a 30% senior discount.`);
}

console.log("\n");

// soln 2: use var and const, to calculate the area of a rectangle
var length = prompt("Enter the length of the rectangle: ");
var width = prompt("Enter the width of the rectangle: ");
const area = length * width;
console.log(`The area of the rectangle is: ${area}`);

//soln 3: object to store user details
var product1 = {
    name: "Laptop",
    price: 800,
    inStock: true
};

var product2 = {
    name: "Smartphone",
    price: 600,
    inStock: false
};

var product3 = {
    name: "Tablet",
    price: 300,
    inStock: true
};

var products = [product1, product2, product3];
console.log(products);

for (var key in products) {
    console.log(`Product Name: ${products[key].name}, Price: $${products[key].price}, In Stock: ${products[key].inStock}`);
}

//soln 4: Arrays

var guestList = ['ketan', 'tejas', 'sachin', 'pratik', 'sagar'];

if (guestList.includes(userName)) {
    console.log(`Welcome to the party, ${userName}!`);
} else {
    console.log(`Sorry, ${userName}, you are not on the guest list.`);
}

//soln 5: json

var jsonData = {
    "date": "YYYY-MM-DD",
    "temperature": 25,
    "condition": "Sunny", // Example: "Sunny", "Rainy", "Cloudy", etc.
    "humidity": 60
}
console.log(`Weather on ${jsonData.date}: ${jsonData.temperature}°C, ${jsonData.condition}, Humidity: ${jsonData.humidity}%`);


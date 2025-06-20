console.log("notes.js file is running");

var todoList = ["Buy groceries", "Walk the dog", "Finish homework"];

var priority = 100;

const changePriority = function (a, b) {
    console.log("Changing priority from " + a + " to " + b);
    return b;
}

// Export the todoList array and other modules.
module.exports = {
    todoList,
    changePriority
}
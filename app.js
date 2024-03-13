//Applying Use Strict

"use strict";

// Array to Act as my Database

const storedData = localStorage.getItem("todoData");
const database = storedData ? JSON.parse(storedData) : [];

//const database = [];

// Variable to track the index of the task being edited
let editingIndex = -1;

// Refrencing the Html Elements Using Their Id's

const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTask")


// Function to Render the To-Do List

function renderTodoList() {
   
    taskList.innerHTML = "";

    database.forEach((task, index) => {
        const li = document.createElement("li");
        if (index === editingIndex) {
            // Displaying an input field for editing when editingIndex matches the current index
            li.innerHTML = `
                <input id="editTask" type="text" value="${task}">
                <button onclick="saveEditedTask(${index})">Save</button>
            `;
        } else {
            // Displaying the task's text and "Edit" and "Remove" buttons
            li.innerHTML = `
                <span>${task}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="removeTask(${index})">Remove</button>
            `;
        }
        taskList.appendChild(li);
        console.log("task: ", task, "index: ", index);
    });
}

// Function to Add a New Task to the Database and Update the To-Do List
function addTask() {
   
    const newTask = taskInput.value.trim();

    if (newTask === "") {
        alert("Please Enter a Task.");
        return;
    }
    
    database.push(newTask);
    console.log(database);
    saveDataToLocalStorage();
    renderTodoList();
    taskInput.value = "";
}

// Function to Remove a Task From the Database and Update the To-Do List

function removeTask(index) {
    if (index >= 0 && index < database.length) {
        database.splice(index, 1);
        console.log(database);
        saveDataToLocalStorage();
        renderTodoList();
    }
}



// Function to Edit a Task
function editTask(index) {
    editingIndex = index;
    //console.log("editingIndex: ",editingIndex);
    renderTodoList();
    const editInput = document.getElementById("editTask");
    editInput.focus();
    editInput.addEventListener("blur", saveEditedTask);
    editInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            saveEditedTask();
        }
    });
}

// Function to Save the Edited Task in the Database and Update the To-Do List
function saveEditedTask(index) {
    
    console.log("editingIndex: ",editingIndex);
    
    const editInput = document.getElementById("editTask");
    const editedTask = editInput.value.trim();

    
    if (editingIndex !== -1 && editedTask !== "") {
        
        console.log("editedTask: ",editedTask);
        database[editingIndex] = editedTask;
        saveDataToLocalStorage();
        console.log("database after edit: ",database)
        editingIndex = -1;
        renderTodoList();
    }
}



// Attaching the addTask function to the "Add" button (As a Callback Function)

addTaskButton.addEventListener("click", addTask);


// Function to save my database array to the localStorage
function saveDataToLocalStorage() {
    localStorage.setItem("todoData", JSON.stringify(database));
}

// Initialization of the Initial Rendering of the To-Do List

renderTodoList();

// Adding Tasks When User Press Enter Key in the Input Field

taskInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

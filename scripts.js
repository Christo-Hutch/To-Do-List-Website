document.addEventListener('DOMContentLoaded', loadTasks);

const form = document.getElementById('item-form');
const input = document.getElementById('item-input');

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = input.value.trim();

    if (taskText !== "") {
        addTaskToLocalStorage(taskText);
        input.value = "";
    }
});

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Function to add a task to localStorage and render it
function addTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    const newTask = {text: taskText, completed: false};
    
    tasks.push(newTask);
    
    localStorage.setItem('todos', JSON.stringify(tasks));
    
    createTaskElement(newTask.text, newTask.completed);
}

const toDoList = document.getElementById('to-do-list');

// Function to create a task element
function createTaskElement(taskText, completed) {
    const li = document.createElement('li');
    li.classList.toggle('completed', completed);
    li.className = "item"

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.className = "checkbox"
    checkbox.addEventListener('change', function() {
        toggleTaskCompletion(taskText, checkbox.checked);
    });

    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = "text"

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delbnt"
    deleteBtn.addEventListener('click', function() {
        deleteTask(taskText);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    toDoList.appendChild(li);
}

// Function to toggle a task's completion status
function toggleTaskCompletion(taskText, isCompleted) {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    const task = tasks.find(task => task.text === taskText);
    if (task) {
        task.completed = isCompleted;
        localStorage.setItem('todos', JSON.stringify(tasks));
        refreshList();
    }
}

// Function to delete a task
function deleteTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('todos', JSON.stringify(updatedTasks));
    refreshList();
}

// Function to refresh the UI based on current tasks in localStorage
function refreshList() {
    toDoList.innerHTML = '';
    loadTasks();
}
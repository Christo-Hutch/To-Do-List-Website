document.addEventListener('DOMContentLoaded', loaditems);

const form = document.getElementById('item-form');
const input = document.getElementById('item-input');

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const itemText = input.value.trim();

    if (itemText !== "") {
        addItemToLocalStorage(itemText);
        input.value = "";
    }
});

// Function to load items from localStorage
function loaditems() {
    const items = JSON.parse(localStorage.getItem('todos')) || [];
    items.forEach(item => {
        createItemElement(item.text, item.completed);
    });
}

// Function to add an item to localStorage and render it
function addItemToLocalStorage(itemText) {
    const items = JSON.parse(localStorage.getItem('todos')) || [];
    const newitem = {text: itemText, completed: false};
    
    items.push(newitem);
    
    localStorage.setItem('todos', JSON.stringify(items));
    
    createItemElement(newitem.text, newitem.completed);
}

const toDoList = document.getElementById('to-do-list');

// Function to create an item element
function createItemElement(itemText, completed) {
    const li = document.createElement('li');
    li.classList.toggle('completed', completed);
    li.classList.add("item");

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.className = "checkbox"
    checkbox.addEventListener('change', function() {
        li.classList.toggle('completed', checkbox.checked);
        toggleItemCompletion(itemText, checkbox.checked);
    });

    const span = document.createElement('span');
    span.textContent = itemText;
    span.className = "text"

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delbnt"
    deleteBtn.addEventListener('click', function() {
        deleteitem(itemText);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    toDoList.appendChild(li);
}

// Function to toggle a item's completion status
function toggleItemCompletion(itemText, isCompleted) {
    const items = JSON.parse(localStorage.getItem('todos')) || [];
    const item = items.find(item => item.text === itemText);
    if (item) {
        item.completed = isCompleted;
        localStorage.setItem('todos', JSON.stringify(items));
        refreshList();
    }
}

// Function to delete a item
function deleteitem(itemText) {
    const items = JSON.parse(localStorage.getItem('todos')) || [];
    const updateditems = items.filter(item => item.text !== itemText);
    localStorage.setItem('todos', JSON.stringify(updateditems));
    refreshList();
}

// Function to refresh the UI
function refreshList() {
    toDoList.innerHTML = '';
    loaditems();
}

// Function to delete all items
function delall() {
    document.getElementById("to-do-list").innerHTML = "";
    localStorage.removeItem('todos');
}

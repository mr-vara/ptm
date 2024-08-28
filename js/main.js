document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from LocalStorage
    loadTasksFromLocalStorage();

    // Function to add a new task
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToList(taskText);
            saveTaskToLocalStorage(taskText);
            taskInput.value = ''; // Clear the input field
        }
    });

    // Function to delete a task
    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const taskItem = e.target.parentElement;
            const taskText = taskItem.textContent.replace('Delete', '').trim();
            taskList.removeChild(taskItem);
            deleteTaskFromLocalStorage(taskText);
        }
    });

    // Function to add a task to the list (DOM)
    function addTaskToList(taskText) {
        const newTaskItem = document.createElement('li');
        newTaskItem.className = 'task-item';
        newTaskItem.innerHTML = `${taskText} <button class="delete-btn">Delete</button>`;
        taskList.appendChild(newTaskItem);
    }

    // Function to save a task to LocalStorage
    function saveTaskToLocalStorage(taskText) {
        let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from LocalStorage
    function loadTasksFromLocalStorage() {
        let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        tasks.forEach(taskText => addTaskToList(taskText));
    }

    // Function to delete a task from LocalStorage
    function deleteTaskFromLocalStorage(taskText) {
        let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

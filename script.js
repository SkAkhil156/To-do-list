const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// Load from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add task
function addTask(text) {
  tasks.push({ text, checked: false });
  saveAndRender();
}

// Delete task by index
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// Toggle task status
function toggleTask(index) {
  tasks[index].checked = !tasks[index].checked;
  saveAndRender();
}

// Save to localStorage and render
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Render all tasks
function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.checked ? 'checked' : '';
    li.textContent = task.text;

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.setAttribute('data-index', index);
    li.appendChild(deleteBtn);

    // Set data index
    li.setAttribute('data-index', index);
    todoList.appendChild(li);
  });
}

// Handle button click
addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (text === '') return alert('Please enter a task!');
  addTask(text);
  todoInput.value = '';
  todoInput.focus();
});

// Enter key support
todoInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addBtn.click();
});

// Event delegation for toggle and delete
todoList.addEventListener('click', e => {
  const index = e.target.closest('li')?.dataset.index;
  if (e.target.classList.contains('delete-btn')) {
    deleteTask(index);
  } else if (index !== undefined) {
    toggleTask(index);
  }
});

// Initial load
renderTasks();

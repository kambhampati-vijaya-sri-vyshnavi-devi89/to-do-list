const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

document.addEventListener('DOMContentLoaded', loadTodos);
form.addEventListener('submit', addTodo);
todosUL.addEventListener('click', handleTodoClick);

function addTodo(event) {
    event.preventDefault();
    const todoText = input.value.trim();

    if (todoText) {
        createTodoElement(todoText);
        saveTodos();
        input.value = '';
    }
}

function createTodoElement(text, completed = false) {
    const todoEl = document.createElement('li');
    todoEl.textContent = text;
    if (completed) todoEl.classList.add('completed');
    todoEl.classList.add('fade-in');
    todosUL.appendChild(todoEl);
}

function handleTodoClick(event) {
    if (event.target.tagName === 'LI') {
        if (event.button === 0) {
            event.target.classList.toggle('completed');
        } else if (event.button === 2) {
            event.preventDefault();
            event.target.remove();
        }
        saveTodos();
    }
}

function saveTodos() {
    const todos = Array.from(todosUL.children).map(todo => ({
        text: todo.textContent,
        completed: todo.classList.contains('completed')
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => createTodoElement(todo.text, todo.completed));
}

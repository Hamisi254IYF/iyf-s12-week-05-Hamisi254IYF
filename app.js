// DOM elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = [];
let currentFilter = "all";

// --- create the <li> for one todo ---
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add("completed");

    const text = document.createElement("span");
    text.className = "task-text";
    // Use textContent, NOT innerHTML — the text came from the user.
    text.textContent = todo.text;

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "✕";
    del.setAttribute("aria-label", "Delete task");

    li.append(text, del);
    return li;
}

// --- render based on filter ---
function renderTodos() {
    todoList.innerHTML = "";
    const visible = todos.filter((t) => {
        if (currentFilter === "active") return !t.completed;
        if (currentFilter === "completed") return t.completed;
        return true;
    });
    visible.forEach((t) => todoList.appendChild(createTodoElement(t)));
    updateStats();
}

// --- add ---
function addTodo(text) {
    const clean = text.trim();
    if (!clean) return;
    todos.push({
        id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
        text: clean,
        completed: false,
    });
    renderTodos();
}

// --- toggle ---
function toggleTodo(id) {
    const t = todos.find((t) => t.id === id);
    if (t) {
        t.completed = !t.completed;
        renderTodos();
    }
}

// --- delete ---
function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
    renderTodos();
}

// --- stats ---
function updateStats() {
    const remaining = todos.filter((t) => !t.completed).length;
    itemsLeft.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

// --- filter ---
function filterTodos(filter) {
    currentFilter = filter;
    filters.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    renderTodos();
}

// --- events ---

// add via form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
    input.focus();
});

// delegation on the list — handles toggle + delete
todoList.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    const id = li.dataset.id;

    if (event.target.classList.contains("delete-btn")) {
        deleteTodo(id);
    } else {
        toggleTodo(id);
    }
});

// filters
filters.forEach((btn) => {
    btn.addEventListener("click", () => filterTodos(btn.dataset.filter));
});

// clear completed
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.completed);
    renderTodos();
});

// init
renderTodos();
const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = [];

// Add task
button.addEventListener("click", function () {
  const value = input.value.trim();

  if (value === "") return;

  tasks.push({
    text: value,
    completed: false,
  });

  input.value = "";
  renderTasks();
});

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Render UI
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // checkbox
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.completed;

    check.addEventListener("change", () => {
      toggleComplete(index);
    });

    // text
    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    }

    li.appendChild(check);
    li.appendChild(span);

    list.appendChild(li);
  });
}
const input = document.getElementById("taskInput")
const button = document.getElementById("addBtn")
const list = document.getElementById("taskList")

let tasks = [];

button.addEventListener("click", function () {

  const value = input.value;
  if (value === "") return;
  tasks.push(value)
  input.value = "";
  renderTasks()
})

const renderTasks = () => {
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li")
    li.textContent = task;
    list.appendChild(li);
  });
}
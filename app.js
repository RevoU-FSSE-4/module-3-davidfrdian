async function fetchData() {
  const request = new Request(
    "https://module3-api-is2m.onrender.com/random-todos"
  );
  const response = await fetch(request);
  return await response.json();
}

function createTaskElement(task) {
  const taskElement = document.createElement("li");

  const taskText = document.createElement("text");
  taskText.textContent = task;

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", function () {
    taskElement.style.backgroundColor = "white";
    taskText.style.opacity = 0.3;
    taskText.style.textDecoration = "line-through";
  });

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    taskElement.remove();
  });

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "buttonDiv";

  buttonDiv.appendChild(completeButton);
  buttonDiv.appendChild(removeButton);

  taskElement.appendChild(taskText);
  taskElement.appendChild(buttonDiv);

  return taskElement;
}

async function addTask() {
  const newTaskInput = document.getElementById("newTask");
  const newTaskText = newTaskInput.value.trim();

  if (newTaskText !== "") {
    const taskListElement = document.getElementById("taskList");
    const taskElement = createTaskElement(newTaskText);
    taskListElement.appendChild(taskElement);
    newTaskInput.value = "";
  } else {
    alert("add task cannot to be empty");
  }
}

async function listAppear() {
  const json = await fetchData();
  const taskListElement = document.getElementById("taskList");

  json.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskListElement.appendChild(taskElement);
  });

  const addTaskButton = document.getElementById("addTaskBtn");
  addTaskButton.addEventListener("click", addTask);
}

listAppear();

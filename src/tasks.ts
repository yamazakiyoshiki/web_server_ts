interface TaskType {
  title: string;
  createdAt: string;
}

const tasksTableBodyElement = document.getElementById(
  "tasks-table-body"
) as HTMLTableSectionElement;

const taskTitleInputElement = document.getElementById(
  "task-title-input"
) as HTMLInputElement;

const taskAddButtonElement = document.getElementById(
  "task-add-button"
) as HTMLButtonElement;

async function loadTasks() {
  const response = await fetch("http://localhost:8080/api/tasks");
  const responseBody = await response.json();

  const tasks: TaskType[] = responseBody.tasks;

  while (tasksTableBodyElement.firstChild) {
    tasksTableBodyElement.removeChild(tasksTableBodyElement.firstChild);
  }

  tasks.forEach((task: TaskType) => {
    const titleTdElement = document.createElement("td");
    titleTdElement.innerText = task.title;

    const createdAtTdElement = document.createElement("td");
    createdAtTdElement.innerText = task.createdAt;

    const trElement = document.createElement("tr");
    trElement.appendChild(titleTdElement);
    trElement.appendChild(createdAtTdElement);

    tasksTableBodyElement.appendChild(trElement);
  });
}

async function registerTask() {
  const title = taskTitleInputElement.value;

  const requestBody = {
    title: title,
  };

  await fetch("http://localhost:8080/api/tasks", {
    method: "POST",
    body: JSON.stringify(requestBody),
  });

  await loadTasks();
}

async function main() {
  taskTitleInputElement.addEventListener("input", (event) => {
    const inputValue = (event.target as HTMLInputElement).value;
    const isInvalidInput = inputValue.length < 1 || 30 < inputValue.length;
    taskAddButtonElement.disabled = isInvalidInput;
  });

  taskAddButtonElement.addEventListener("click", registerTask);
  await loadTasks();
}

main();

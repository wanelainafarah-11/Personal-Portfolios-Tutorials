const storageKey = "TaskTracker.tasks";
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

/*if nothing then set to empty array, otherwise parse the string from local storage*/
let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

/*to do list still be there when we refresh the page*/
function saveTasks() {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function renderTasks() { /*redraw the task list*/
    taskList.innerHTML = ""; /*clear the list before redrawing*/
    tasks.forEach((task, index) => { /*loop through tasks and create list items*/
        const item = document.createElement("li");
        item.className = "task-item"; /*add class for styling*/

        const text = document.createElement("p"); /*create a paragraph element for the task text*/
        text.className = `task-text${task.done? " done" : ""}`; /* add done class if task is done*/
        text.textContent = task.text; /*set the text content to the task text*/
        text.addEventListener("click", () => toggleTask(index)); /*clickable to mark as done or not done*/

          const actions = document.createElement("div");
  actions.className = "task-actions";

  const doneButton = document.createElement("button"); 
  doneButton.className = "action-btn";
  doneButton.type = "button";/*button to mark as done or not done*/
  doneButton.title = task.done ? "Mark as not done" : "Mark as done";
  doneButton.textContent = task.done ? "↺" : "✓"; /*checkmark if not done, reload symbol if done*/
  doneButton.addEventListener("click", () => toggleTask(index));

  const deleteButton = document.createElement("button");
  deleteButton.className = "action-btn delete";
  deleteButton.type = "button";
  deleteButton.title = "Delete task";
  deleteButton.textContent = "✕";
  deleteButton.addEventListener("click", () => deleteTask(index));
  /*delete button X to remove the task*/

  actions.append(doneButton, deleteButton); /*add buttons to the actions container*/
  item.append(text, actions); /*add the text and actions to the list item*/
  taskList.appendChild(item); /*add the list item to the task list*/
});

    saveTasks(); /*save everything to browser storage*/
}

function addTask() { /*add a new task to the list*/
    const value = taskInput.value.trim(); /*get the input value and trim empty spaces*/
    if (!value) return; /*if the input is empty, do nothing*/
    tasks.push({ text: value, done: false }); /*add new task obj to the array*/
    taskInput.value = ""; /*clear the input field*/
    renderTasks(); /*redraw the updatedtask list*/
    taskInput.focus(); /*cursor back to the input you can type the next task*/
}

function toggleTask(index) { /*marks a task done/undone*/
  tasks[index].done = !tasks[index].done; /*toggle value true/false*/
  renderTasks(); /*redraw the task list*/
}

function deleteTask(index) { /*remove a task*/
  tasks.splice(index, 1); /*remove 1 item at that position*/
  renderTasks(); /*redraw*/
}

function bindEvents() { /*connect buttons & input to their functions*/
    
    const button = document.getElementById("addButton");
    button.addEventListener("click", addTask);
    /*click Add button calls addTask function*/

    taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
  /*pressing Enter in the input field also calls addTask function*/
}
bindEvents(); /*set up event listeners*/
renderTasks(); /*shows any saved tasks from before*/

/*In short: what this JS does
Persistent data → tasks are saved in the browser and stay after reload.

Add, toggle, delete → you can add, mark as done, and remove tasks.

UI updates → renderTasks() rebuilds the list and saveTasks() keeps it saved.

Keyboard shortcut → pressing Enter in the input adds a task.*/

    
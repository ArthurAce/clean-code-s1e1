//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.querySelector(".btn");//first button
const incompleteTaskHolder = document.getElementById("list");//ul of #list
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


//New task list item
const createNewTaskElement = function(taskString){
  const listItem = document.createElement("li");
  //input (checkbox)
  const checkBox = document.createElement("input");//checkbx
  //label
  const label = document.createElement("label");//label
  //input (text)
  const editInput = document.createElement("input");//text
  //button.edit
  const editButton = document.createElement("button");//edit button
  //button.delete
  const deleteButton = document.createElement("button");//delete button
  const deleteButtonImg = document.createElement("img");//delete button image

  label.innerText = taskString;
  label.className = 'task-name';

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";

  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "btn edit";

  deleteButton.className = "btn delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "btn__img"
  deleteButton.appendChild(deleteButtonImg);  

  //and appending.
  listItem.className = "list__item";
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}



const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.
const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task");
  const label = listItem.querySelector(".task-name");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
  if(containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
    //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
};


//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function () {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  const label = listItem.querySelector(".task-name");
  label.classList.add("line-through");
  const checkBox = listItem.querySelector(".checkbox");
  checkBox.checked = true;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #list.
  const listItem=this.parentNode;
  const label = listItem.querySelector(".task-name");
  label.classList.remove("line-through");
  const checkBox = listItem.querySelector(".checkbox");
  checkBox.checked = false;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

  //Set the click handler to the addTask function.
  addButton.addEventListener("click",addTask);



const bindTaskEvents = function (taskListItem,checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector(".checkbox");
  const editButton = taskListItem.querySelector(".edit");
  const deleteButton = taskListItem.querySelector(".delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;

  const label = taskListItem.querySelector(".task-name");
    if (checkBox.checked) {
      label.classList.add("line-through");
    } else {
      label.classList.remove("line-through");
    }
}

//cycle over incompleteTaskHolder ul list items
//for each list item

const initializeTasks = () => {
  [...incompleteTaskHolder.children].forEach((item) => {
    bindTaskEvents(item, taskCompleted);
  });
  [...completedTasksHolder.children].forEach((item) => {
    bindTaskEvents(item, taskIncomplete);

    const label = item.querySelector(".task-name");
    label.classList.add("line-through");
  });
};

initializeTasks();
// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
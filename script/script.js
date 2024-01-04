let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let statusInput = document.getElementById("statusInput");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

// Making a call back function to prevent default behavier(refresh automaticlly)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation(); // calling form validation function after submit
  });
  
  // Making a form validation to check input(empty or not)
  let formValidation = () => {
    if (textInput.value === "") {
     msg.innerHTML = "Task cannot be blank"; // if row is empty we print a message
    } else {
      msg.innerHTML = ""; // if row is not empty leave a blank space
      acceptData();
      add.setAttribute("data-bs-dismiss","modal");
      add.click();

      // a regular function to fix a reload modal
      (() => {
        add.setAttribute("data-bs-dismiss", "");
      })();
    }
  };

  let data = {}; // object to store Data from the input

  // function to fetch the data
  let acceptData = () => {
    data["text"] = textInput.value;
    data["date"] = dateInput.value;
    data["status"] = statusInput.value;

    createTasks();
  }; 

  // function to creat a task
  let createTasks = () =>{
    tasks.innerHTML += `
    <div>
        <span class="fw-bold">${data.text}</span>
        <span class=>${data.date}</span>
        <p>${data.status}</p>
        <span class="options">
          <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa fa-edit"></i>
          <i onClick="deleteTask(this)" class=" fa fa-solid fa-trash"></i>
        </span>
    </div>`;

    resetForm();
  }

  // function to delete task
  let deleteTask = (e) => {
    e.parentElement.parentElement.remove(); // the main idea is we are jumping to the first parent element we need to delete whole task
  }

  // function to edit task
  let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    statusInput.value = selectedTask.children[2].innerHTML;

    selectedTask.remove();
  }


  // function to reset the form after the input
  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    statusInput.value = "";
  }
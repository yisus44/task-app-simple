//render previous tasks(async) -- DONE
//get text from a html form and render it --DONE
//get a way of a delete an element of a list --DONE

const taskList = document.getElementById("task-list");
const newTaskDescription = document.getElementById("task-description");
const newTaskTitle = document.getElementById("task-title");
const btnSubmit = document.getElementById("btn-submit");

//add event event listener to all buttons

function renderPastTasks() {
  //use local storage to get tasks and ids
  for (let i = 0; i < localStorage.length; i++) {
    const title = localStorage.key(i);
    const description = localStorage.getItem(title);

    renderTask(title, description);
  }
}

function renderTask(title, description) {
  const html = `
        <li class="task">
                <p  class="title">${title}</p>
                <p  class="description">${description}</p> 
                <button class="btn-remove" type="button">Did it!</Button>
        </li>
    `;
  taskList.insertAdjacentHTML("beforeEnd", html);
}

function updateDeleteButtons() {
  //add events listeners
  const allTasks = document.querySelectorAll(".task");
  allTasks.forEach((_, index) => {
    allTasks[index]
      .querySelector("button")
      .addEventListener("click", function () {
        const currentTask = this.closest(".task");
        const storageKey = currentTask.children[0].innerHTML;
        console.log(storageKey);
        window.localStorage.removeItem(storageKey);

        currentTask.remove();
      });
  });
}

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const taskTitle = newTaskTitle.value;
  const taskDescription = newTaskDescription.value;
  console.log(taskTitle);
  console.log(taskDescription);
  renderTask(taskTitle, taskDescription);
  updateDeleteButtons();
  localStorage.setItem(taskTitle, taskDescription);
});

(function () {
  renderPastTasks();
  updateDeleteButtons();
})();

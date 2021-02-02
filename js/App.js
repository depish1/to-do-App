import { Api } from "./Api.js";
import { Task } from "./Task.js";

export class App {
  constructor() {
    this.api = new Api();
    this.btnShowForm = document.querySelector(".button--show-form");
    this.formContainer = document.querySelector(".add-task");
    this.tasksArray = [];
    this.tasksContainer = document.querySelector(".tasks");
    this.formTaskName = document.querySelector("#taskTitle");
    this.formTaskDate = document.querySelector("#taskDate");
    this.formTaskPriority = document.querySelector("#taskPriority");
    this.formPriorityOptions = document.querySelectorAll(
      "#taskPriority option"
    );
    this.formTaskDesc = document.querySelector("#taskDescription");
    this.formResult = document.querySelector(".form-result");
    this.api
      .getTasks()
      .then((tasksData) => {
        this.createTasks(tasksData);
        return true;
      })
      .then(() => this.renderTasks());

    this.formContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      const errorString = this.validateForm();
      errorString ? this.showError(errorString) : this.addTask();
    });

    this.btnShowForm.addEventListener("click", (e) => {
      App.showHideElement(this.formContainer);
      App.changeFormButton(this.formContainer, e.target);
    });
  }

  static showHideElement(element) {
    element.classList.toggle("hidden");
  }

  static changeFormButton(element, button) {
    if (element.classList.contains("hidden")) {
      button.textContent = "Nowe zadanie";
    } else {
      button.textContent = "Zwiń formularz";
    }
  }

  createTasks(tasks) {
    tasks.forEach((task) => {
      this.tasksArray.push(new Task(task));
    });
  }

  renderTasks() {
    this.tasksArray.forEach((task) => {
      this.tasksContainer.appendChild(task.createTaskElement());
    });
  }

  showError(string) {
    this.formResult.innerHTML = string;
    this.formResult.classList.remove("hidden", "form-result--succes");
    this.formResult.classList.add("form-result--failure");
  }

  addTask() {
    const task = {
      title: `${this.formTaskName.value}`,
      date: `${this.formTaskDate.value}`,
      priority: `${
        this.formPriorityOptions[this.formTaskPriority.selectedIndex].value
      }`,
      description: `${this.formTaskDesc.value}`,
    };

    this.api.postTask(task);
  }

  validateForm() {
    let errorString = "";
    if (this.formTaskName.value.length < 3) {
      errorString +=
        "<p class='form-result__error'>**Temat zadania musi mieć minimum 3 znaki.**</p>";
    }
    if (!this.formTaskDate.value) {
      errorString +=
        "<p class='form-result__error'>**Musisz wybrać datę.**</p>";
    }
    if (new Date(this.formTaskDate.value) < new Date()) {
      errorString +=
        "<p class='form-result__error'>**Data nie może być z przeszłości.**</p>";
    }
    if (![0, 1, 2].includes(this.formTaskPriority.selectedIndex)) {
      errorString +=
        "<p class='form-result__error'>**Musisz wybrać jedną z opcji priorytetu.**</p>";
    }
    if (this.formTaskDesc.value.length < 3) {
      errorString +=
        "<p class='form-result__error'>**Opis zadania musi mieć minimum 3 znaki.**</p>";
    }

    return errorString;
  }
}

import { App } from "./App.js";
import { Api } from "./Api.js";

export class Task {
  constructor(taskObj) {
    const { id, title, priority, date, description } = taskObj;
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.date = date;
    this.description = description;
  }

  createTaskElement() {
    const parentElement = document.createElement("div");
    const descElement = document.createElement("div");
    const mainElement = document.createElement("div");
    const mainLeft = document.createElement("div");
    const mainRight = document.createElement("div");
    const priorElement = this.createPriorityElement();
    const dateElement = this.createDateElement();
    const deleteButton = this.createTaskDeleteButton();

    mainLeft.textContent = this.title;
    mainElement.classList.add("tasks__main");
    mainLeft.classList.add("tasks__main__column");
    mainRight.classList.add(
      "tasks__main__column",
      "tasks__main__column--right"
    );
    mainRight.appendChild(priorElement);
    mainRight.appendChild(dateElement);
    mainRight.appendChild(deleteButton);

    mainElement.appendChild(mainLeft);
    mainElement.appendChild(mainRight);

    parentElement.classList.add("tasks__task");

    descElement.textContent = this.description;
    descElement.classList.add("tasks__desc", "hidden");

    parentElement.appendChild(mainElement);
    parentElement.appendChild(descElement);
    mainElement.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        e.stopPropagation();
        Api.deleteTask(e.target.dataset.taskId);
        e.currentTarget.parentElement.remove();
        return;
      }
      App.showHideElement(e.currentTarget.nextSibling);
    });

    return parentElement;
  }

  createPriorityElement() {
    const colorPicker = {
      low: "green",
      medium: "yellow",
      high: "red",
    };
    const priorDiv = document.createElement("div");
    const prior = this.priority;
    const color = colorPicker[prior];
    priorDiv.style.backgroundColor = color;
    priorDiv.classList.add("tasks__prior");
    return priorDiv;
  }

  createDateElement() {
    const date = new Date(this.date).toISOString().slice(0, 10);
    const dateSpan = document.createElement("span");
    dateSpan.classList.add("tasks__date");
    dateSpan.textContent = date;
    return dateSpan;
  }

  createTaskDeleteButton() {
    const btn = document.createElement("button");
    btn.classList.add("button", "button--delete");
    btn.textContent = "Usuń";
    btn.dataset.taskId = this.id;

    return btn;
  }
}

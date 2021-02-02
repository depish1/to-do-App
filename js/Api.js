export class Api {
  getTasks() {
    const url = "http://localhost:3000/tasks";
    return fetch(url).then((response) => response.json());
  }

  postTask(data) {
    const url = "http://localhost:3000/tasks/";
    fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {});
  }

  static deleteTask(id) {
    fetch("http://localhost:3000/tasks/" + id, {
      method: "DELETE",
    });
  }
}

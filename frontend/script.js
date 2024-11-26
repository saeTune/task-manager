const apiUrl = "http://localhost:8080/api/tasks"; // Spring BootサーバーのURL

// タスクを追加する処理
document.getElementById("addTaskBtn").addEventListener("click", function () {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;

  if (!title) {
    alert("Task title is required!");
    return;
  }

  const newTask = { title, description, completed: false };

  // バックエンドにPOSTリクエストを送信
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  })
    .then((response) => response.json())
    .then((data) => {
      addTaskToUI(data); // 新しいタスクをUIに追加
    })
    .catch((error) => {
      console.error("Error adding task:", error);
    });

  // フォームのリセット
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
});

// タスクを取得して表示
function fetchTasks() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((tasks) => {
      tasks.forEach(addTaskToUI);
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
}

// UIにタスクを追加
function addTaskToUI(task) {
  const taskList = document.getElementById("taskList");
  const listItem = document.createElement("li");
  listItem.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <p>${task.description}</p>
      </div>
      <button class="delete-btn">Delete</button>
    `;

  // 削除ボタンのイベントリスナー
  listItem.querySelector(".delete-btn").addEventListener("click", function () {
    deleteTask(task.id, listItem);
  });

  taskList.appendChild(listItem);
}

// タスクを削除する
function deleteTask(taskId, listItem) {
  fetch(`${apiUrl}/${taskId}`, {
    method: "DELETE",
  })
    .then(() => {
      const taskList = document.getElementById("taskList");
      taskList.removeChild(listItem);
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
    });
}

// ページ読み込み時にタスクを取得
document.addEventListener("DOMContentLoaded", fetchTasks);

// document.getElementById("addTaskBtn").addEventListener("click", function () {
//   const title = document.getElementById("taskTitle").value;
//   const description = document.getElementById("taskDescription").value;

//   if (!title) {
//     alert("Task title is required!");
//     return;
//   }

//   const taskList = document.getElementById("taskList");
//   const listItem = document.createElement("li");
//   listItem.innerHTML = `
//       <div>
//         <strong>${title}</strong>
//         <p>${description}</p>
//       </div>
//       <button class="delete-btn">Delete</button>
//     `;

//   listItem.querySelector(".delete-btn").addEventListener("click", function () {
//     taskList.removeChild(listItem);
//   });

//   taskList.appendChild(listItem); //taskList後ろに追加

//   // Clear the form タスク追加した後にフォームの中身を消してくれる
//   document.getElementById("taskTitle").value = "";
//   document.getElementById("taskDescription").value = "";
// });

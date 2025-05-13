const todoInput = document.querySelector("#todo-input");
const createButton = document.querySelector("#add-todo");
const todoList = document.querySelector("#todo-list");

// Todolist CRUD

// Create: Promise를 리턴
const createTodo = () => {
  const todo = {
    text: todoInput.value,
  };

  return fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
};

const readTodo = async () => {
  const res = await fetch("http://localhost:3000",{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

// Update: ID를 통해 특정 todo를 업데이트
const updateTodo = (todo) => {
  return fetch("http://localhost:3000", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
};

// Delete: ID를 통해 특정 todo를 삭제
const deleteTodo = (id) => {
  return fetch("http://localhost:3000", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
};

const renderDisplay = (data) => {
  for (let el of data) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = el.text;
    if (el.done) {
      li.classList.add("done");
    }

    const toggleCheckbox = document.createElement("input");
    toggleCheckbox.type = "checkbox";
    toggleCheckbox.checked = el.done;
    toggleCheckbox.addEventListener("click", () => {
      if (toggleCheckbox.checked) {
        li.classList.add("done");
      } else {
        li.classList.remove("done");
      }
    });
    const updateInput = document.createElement("input");
    updateInput.type = "text";
    updateInput.placeholder = "수정할 내용을 입력하세요";
    const updateButton = document.createElement("button");
    updateButton.textContent = "수정";

    updateButton.addEventListener("click", () => {
      updateTodo({
        id: el.id,
        text: updateInput.value,
      })
        .then(() => {
          return readTodo();
        })
        .then((updatedTodos) => {
          removeDisplay();
          renderDisplay(updatedTodos);
        });
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteTodo({ id: el.id })
        .then(() => {
          return readTodo();
        })
        .then((updatedTodos) => {
          removeDisplay();
          renderDisplay(updatedTodos);
        });
    });

    li.appendChild(toggleCheckbox);
    li.appendChild(p);
    li.appendChild(updateInput);
    li.appendChild(updateButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }
};

const removeDisplay = () => {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
};

createButton.addEventListener("click", () => {
  if (todoInput.value === "") {
    alert("할 일을 입력하세요!");
    todoInput.focus();
    return;
  }
  createTodo()
    .then(() => readTodo())
    .then((res) => {
      removeDisplay();
      renderDisplay(res);
      todoInput.value = "";
      todoInput.focus();
    });
});

readTodo().then((res) => renderDisplay(res));

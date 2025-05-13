const todoInput = document.querySelector("#todo-input");
const createButton = document.querySelector("#add-todo");
const todoList = document.querySelector("#todo-list");

// Todolist CRUD

// Create: Promise를 리턴
const createTodo = () => {
  const newTodo = todoInput.value;

  return axios.post("http://localhost:3000", newTodo, {
    headers: {
      "Content-Type": "text/plain",
    },
  }).then((res) => console.log(res.data));
};

const readTodo = async () => {
  const res = await axios.get("http://localhost:3000");
  // console.log(res.data);
  return res.data;
};

// Update: ID를 통해 특정 todo를 업데이트
const updateTodo = (todo) => {
  return axios
    .put("http://localhost:3000", todo)
    .then((res) => console.log(res.data));
};

// Delete: ID를 통해 특정 todo를 삭제
const deleteTodo = (id) => {
  return axios
    .delete("http://localhost:3000", { data: id }) // delete는 조금 다르다. data키를 통해 id를 전달
    .then((res) => console.log(res.data));
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

const express = require("express");
const app = express();
const port = 5001;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`port - ${port}`);
});

const todos = [
  { id: 1, text: "brush teeth", completed: false },
  { id: 2, text: "pet dog", completed: false },
  { id: 3, text: "make coffee", completed: false },
  { id: 4, text: "write code", completed: false },
];

app.get("/", function (req, res) {
  return res.send("hello from localhost");
});

app.get("/todos", function (req, res) {
  return res.send(todos);
});

app.get("/todos/:id", function (req, res) {
  const id = req.params.id;
  let result = null;

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id == id) {
      result = todo;
    }
  }
  return res.send(result);
});

app.post("/todos/", function (req, res) {
  const newID = todos.length + 1;
  const newTodo = {
    id: newID,
    todo: req.body.todo,
    completed: false,
  };
  todos.push(newTodo);

  return res.send(todos);
});

app.put("/todos/", function (req, res) {
  let todoToUpdate = todos.find((todo) => {
    return todo.id == req.body.id;
  });

  todoToUpdate = {
    id: req.body.id,
    todo: req.body.todo,
    completed: req.body.completed,
  };
  let index = todos.findIndex((todo) => {
    return todo.id == req.body.id;
  });

  todos[index] = todoToUpdate;

  return res.send(todos);
});

app.delete("/todos/:id", function (req, res) {
  //  Find the index of that todo to update.
  let index = todos.findIndex((todo) => {
    return todo.id == req.params.id;
  });

  todos.splice(index, 1);

  //  Return the response
  return res.send(todos);
});

app.get("/surname", function (req, res) {
  return res.send("Истомин");
});

app.delete("/surname", function (req, res) {
  return res.send("Истомин");
});

module.exports = (function () {

  function initialize ( app ) {
    app.get("/", app.controllers.home.index);
    app.get("/todo", app.controllers.home.index);
    app.get("/api/todos", app.controllers.todo.list);
    app.get("/api/todos/:id", app.controllers.todo.index);
    app.post("/api/todos", app.controllers.todo.insert);
    app.put("/api/todos/:id", app.controllers.todo.update);
    app.del("/api/todos/:id", app.controllers.todo.remove);
  }

  return {
    initialize: initialize
  }
}());
import TodoModel from "../Models/todo_model";

const getTodos = async () => {
    const response = await fetch("https://localhost:7027/Todo", {
      "headers": {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
      },
      "method": "GET",
    });
    const todos: TodoModel[] = await response.json();
    return todos;
}

export { getTodos }

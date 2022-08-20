import TodoModel from "../Models/todo_model";
import { User } from "../providers/auth_provider";

const BACKEND_URL = 'https://localhost:7027/';

const getTodos = async (token: string) => {
    const response = await fetch(`${BACKEND_URL}Todo`, {
        "headers": {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Authorization': `Bearer ${token}`
        },
        "method": "GET",
    });
    const todos: TodoModel[] = await response.json();
    return todos;
}

const login = async (username: string, password: string) => {
    const login_body = {"username": username, "password" : password};
    const response = await fetch(`${BACKEND_URL}api/Authentication/login`, {
        "headers": {
            "content-type": "application/json",
            'Access-Control-Allow-Origin':'*',
    },
    "body": JSON.stringify(login_body),
    "method": "POST",
    // "credentials": "include"
    });
    // if(!response.ok)
    if(response.ok){
        const response_json  = await response.json();
        const token:string = response_json['token'];
        const id:number= response_json['personId'];
        const user:User = {username: username, token: token, id: id};
        return user;
    }
    return null;
}

const register = async (username: string, password: string) => {
    const register_body = {"username": username, "password" : password};
    const register_response = await fetch(`${BACKEND_URL}api/Authentication/register`, {
        "headers": {
            "content-type": "application/json",
            'Access-Control-Allow-Origin':'*',
    },
    "body": JSON.stringify(register_body),
    "method": "POST",
    // "credentials": "include"
    });
    // if(!response.ok)
    if(register_response.ok){
        const token = await login(username, password);
        if(token){
            return token;
        }
        return null;
    }
    return null;
}

const updateTodo = async (todo: TodoModel, token: string) => {
    const body = JSON.stringify(todo);
    const response = await fetch(`${BACKEND_URL}Todo`, {
      "headers": {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json",
      },
      // "body": "  {\n    \"due\": \"2022-08-04T22:54:27.293Z\",\n    \"description\": \"test test test4\",\n    \"isChecked\": true,\n    \"id\": 4\n  }",
      "body": body,
      "method": "PUT",
    });
    if(response.ok){
        return true;
    }
    return false;
}

const createTodo = async (todo: TodoModel, token: string) => {
    const body = JSON.stringify(todo);
    const response = await fetch(`${BACKEND_URL}Todo`, {
      "headers": {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json",
      },
      "body": body,
      "method": "POST",
    });
    if(response.ok){
        return true;
    }
    return false;
}

const deleteTodo = async (id: number, token: string) => {
    const response = await fetch(`${BACKEND_URL}Todo?id=${id}`, {
      "headers": {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json",
      },
      "method": "Delete",
    });
    if(response.ok){
        return true;
    }
    return false;
}

export { getTodos , login, register, createTodo, updateTodo, deleteTodo}

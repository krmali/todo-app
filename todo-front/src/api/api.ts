import TodoModel from "../Models/todo_model";

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
        return token;
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

export { getTodos , login, register}

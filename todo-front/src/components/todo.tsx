import React from 'react';
import TodoModel from '../Models/todo_model';

type TodoProps = {
    todo: TodoModel,
}

const Todo = ({todo} : TodoProps) => {
    return(
    <div>
       <input type="checkbox" id="checkbox" defaultChecked={todo.isChecked}/>
       <div>{todo.description}</div>
       <div>{todo.due.toString()}</div>
       <button>delete</button>
    </div>
    );
}

export default Todo;


import { Box, Checkbox, Flex, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import TodoModel from '../Models/todo_model';

type TodoProps = {
    todo: TodoModel,
}

const Todo = ({todo} : TodoProps) => {
    const [description, setDescription] = useState<string>("");
    let handleInputChange = (e: any) => {
        let inputValue = e.target.value;
        setDescription(inputValue);
    }
    return(
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md" w={400}>
       <input type="checkbox" id="checkbox" defaultChecked={todo.isChecked}/>
       <Checkbox defaultChecked={todo.isChecked}></Checkbox>
       <div>{todo.description}</div>
       <Textarea
         value={description}
         onChange={handleInputChange}
         size='sm'
        />
       <div>{todo.due.toString()}</div>
       <button>delete</button>
    </Box>
    </Flex>
    );
}

export default Todo;


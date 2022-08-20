import { ArrowUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Text, Box, Checkbox, Flex, HStack, IconButton, Textarea } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import TodoModel from '../Models/todo_model';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteTodo as deleteTodo_api, updateTodo as updateTodo_api} from '../api/api';
import { AuthContext } from '../providers/auth_provider';

type TodoProps = {
    todo: TodoModel,
}

const Todo = ({todo} : TodoProps) => {
    const { user } = useContext(AuthContext);
    const [description, setDescription] = useState<string>(todo.description);
    const [dueDate, setDueDate] = useState<Date>(new Date(todo.due));
    const [isChecked, setIsChecked] = useState<boolean>(todo.isChecked);
    console.log(todo.id);

    const updateTodo = async () => {
        const todo: TodoModel = { id:null, personId: user!.id, description: description
        , isChecked: isChecked, due: dueDate };
        const res = await updateTodo_api(todo, user!.token);
    };

    const deleteTodo = async () => {
        const res = await deleteTodo_api(todo.id!, user!.token);
    };

    return(
        <Box bg="white" p={6} rounded="md" w={400}>
            <HStack>
               <Checkbox 
               onChange={() => setIsChecked(!isChecked)}
               defaultChecked={todo.isChecked}></Checkbox>
               <Box w='300px' minWidth='300px'>
                   <Text fontSize='md'>{description}</Text>
               </Box>
                <Box w="100px">
               <DatePicker selected={dueDate} onChange={(date:Date) => setDueDate(date)} />
               </Box>
               <IconButton
                  colorScheme='orange'
                  aria-label='delete todo'
                  icon={<CloseIcon/>}
                  onClick={deleteTodo}
                />
               <IconButton
                  colorScheme='blue'
                  aria-label='update todo'
                  icon={<ArrowUpIcon/>}
                  onClick={updateTodo}
                />
           </HStack>
        </Box>
    );
}

export default Todo;


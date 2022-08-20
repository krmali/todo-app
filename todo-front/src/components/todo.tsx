import { ArrowUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Text, Box, Checkbox, Flex, HStack, IconButton, Textarea } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import TodoModel from '../Models/todo_model';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteTodo as deleteTodo_api, updateTodo as updateTodo_api} from '../api/api';
import { AuthContext } from '../providers/auth_provider';
import { useQueryClient } from 'react-query';

type TodoProps = {
    todo: TodoModel,
}

const Todo = ({todo} : TodoProps) => {
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext);
    const [dueDate, setDueDate] = useState<Date>(new Date(todo.due));
    const [isChecked, setIsChecked] = useState<boolean>(todo.isChecked);

    const updateTodo = async () => {
        const newtodo: TodoModel = { id:todo.id, personId: user!.id, description: todo.description
        , isChecked: isChecked, due: dueDate };
        await updateTodo_api(newtodo, user!.token);
        queryClient.invalidateQueries(['todos']);
    };

    const deleteTodo = async () => {
        await deleteTodo_api(todo.id!, user!.token);
        queryClient.invalidateQueries(['todos']);
    };

    return(
        <Box bg="white" p={6} rounded="md" w={400}>
            <HStack>
               <Checkbox 
               onChange={() => setIsChecked(!isChecked)}
               defaultChecked={todo.isChecked}></Checkbox>
               <Box w='300px' minWidth='300px'>
                   <Text fontSize='md'>{todo.description}</Text>
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


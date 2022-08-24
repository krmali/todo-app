import { Text, Box, Checkbox, Flex, Textarea, Stack, Button, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import TodoModel from '../Models/todo_model';
import ReactDatePicker from "react-datepicker";
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
    const [description, setDescription] = useState<string>(todo.description);
    const [isChecked, setIsChecked] = useState<boolean>(todo.isChecked);
    const toast = useToast();

    const showToast = (isSuccessful: boolean, operation: string) => {
        if (isSuccessful) {
            queryClient.invalidateQueries(['todos']);
            toast({
                title: `Todo ${operation}`,
                description: `The Todo is ${operation.toLowerCase()} successfully`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
        else {
            toast({
                title: 'Network Error',
                description: "oops, it seems that there is a technical issue.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const updateTodo = async () => {
        const newtodo: TodoModel = { id:todo.id, personId: user!.id, description: description
            , isChecked: isChecked, due: dueDate };
        const isSuccessful = await updateTodo_api(newtodo, user!.token);
        queryClient.invalidateQueries(['todos']);
        showToast(isSuccessful, "Updated");
    };

    const deleteTodo = async () => {
        const isSuccessful = await deleteTodo_api(todo.id!, user!.token);
        queryClient.invalidateQueries(['todos']);
        showToast(isSuccessful, "Deleted");
    };

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value;
        setDescription(inputValue);
    }

    return(
        <>
            <Flex justify="center">
                <Stack
        boxShadow="lg"
        m="1px"
        p="8px"
        borderRadius="lg"
        bg="gray.100"
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justifyContent="space-between">
        <Checkbox 
        size="lg"
        bg="white"
        colorScheme="orange"
        onChange={() => setIsChecked(!isChecked)}
        defaultChecked={todo.isChecked}></Checkbox>
    <Box w="300px" minWidth="300px" bg="white" borderRadius="xl">
        <Textarea
        size='lg'
        variant='outline'
        value={description}
        onChange={handleInputChange}
        w='300px'
        />
    </Box>
    <ReactDatePicker selected={dueDate} onChange={(date: Date) => setDueDate(date)}
        className="react-datapicker__input-text"
        isClearable={true}
        />
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} >
        </Text>
        <Button p="5" colorScheme="blue"
        onClick={updateTodo}
    >update</Button>
<Button p="5" colorScheme="red"
onClick={deleteTodo}
                >delete</Button>
        </Stack>
    </Flex>
</>
    );
}

export default Todo;

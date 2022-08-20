import { CheckIcon } from '@chakra-ui/icons';
import { Box, Checkbox, HStack, IconButton, Textarea } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import TodoModel from '../Models/todo_model';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../providers/auth_provider';
import { createTodo as createTodo_api, } from '../api/api';
import { useQueryClient } from 'react-query';

const TodoInput = () => {
    const { user } = useContext(AuthContext);
    const [description, setDescription] = useState<string>("");
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const queryClient = useQueryClient();

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value;
        setDescription(inputValue);
    }
    const createTodo = async () => {
        const todo: TodoModel = {
            id: null, personId: user!.id, description: description
            , isChecked: isChecked, due: dueDate
        };
        await createTodo_api(todo, user!.token);
        queryClient.invalidateQueries(['todos']);
    };

    return (
        <Box bg="white" p={6} rounded="md" w={400}>
            <HStack>
                <Checkbox
                    onChange={() => setIsChecked(!isChecked)}
                    defaultChecked={isChecked}></Checkbox>
                <Box w="300px" minWidth="300px">
                    <Textarea
                        value={description}
                        onChange={handleInputChange}
                        size='lg'
                        variant='outline'
                        w='300px'
                    />
                </Box>
                <Box w="100px">
                    <DatePicker selected={dueDate} onChange={(date: Date) => setDueDate(date)} />
                </Box>
                <Box minWidth="100px">
                    <IconButton
                        colorScheme='green'
                        aria-label='create todo'
                        icon={<CheckIcon />}
                        onClick={createTodo}
                    />
                </Box>
            </HStack>
        </Box>
    );
}

export default TodoInput;


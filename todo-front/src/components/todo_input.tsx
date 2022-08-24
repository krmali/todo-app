import { Box, Flex, Text, Stack, Textarea, Button, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import TodoModel from '../Models/todo_model';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../providers/auth_provider';
import { createTodo as createTodo_api, } from '../api/api';
import { useQueryClient } from 'react-query';
import { FcAddDatabase } from 'react-icons/fc';

const TodoInput = () => {
    const { user } = useContext(AuthContext);
    const [description, setDescription] = useState<string>("");
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const toast = useToast();

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value;
        setDescription(inputValue);
    }
    const createTodo = async () => {
        const todo: TodoModel = {
            id: null, personId: user!.id, description: description
            , isChecked: isChecked, due: dueDate
        };
        const isSuccessful = await createTodo_api(todo, user!.token);
        if (isSuccessful) {
            queryClient.invalidateQueries(['todos']);
            toast({
                title: 'Todo Created',
                description: "The new Todo is saved successfully",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            setDescription("");
            setIsChecked(false);
            setDueDate(new Date());
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

    return (
        <>
            <Flex justify="center">
                <Stack
                    boxShadow="lg"
                    m="4px"
                    p="8px"
                    borderRadius="lg"
                    bg="teal.50"
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    justifyContent="space-between">
                    <Stack direction="column" align="center">
                        <Text fontWeight="semibold">New Todo</Text>
                        <FcAddDatabase size="30" />
                    </Stack>
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
                    <Button colorScheme="green"
                        onClick={createTodo}
                    >Save</Button>
                </Stack>
            </Flex>
        </>
    );
}

export default TodoInput;


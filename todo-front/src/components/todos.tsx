import { Text, Box, Center, Spinner, StackDivider, useToast, VStack, Flex, Stack, Button, Textarea, Divider } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import {useQuery} from 'react-query';
import {getTodos as getTodos_api} from '../api/api'
import { AuthContext } from '../providers/auth_provider';
import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Todo from './todo';
import TodoInput from './todo_input';

const Todos = () => {
    const { user } = useContext(AuthContext);
    const getTodos = async () => {
        const token = user!.token;
        return await getTodos_api(token);
    };
    const query = useQuery('todos',  getTodos);
    const [isErrorShown, setIsErrorShown] = useState<boolean>(false);
    const toast = useToast();

    if (query.isLoading || query.isIdle) {
        return   <Center><Spinner size='xl' /></Center>;

    }
    if (query.isError) {
        if(!isErrorShown){
            toast({
                title: 'Network Error',
                description: "oops, it seems that there is a technical issue.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            setIsErrorShown(true);
        }
        return <></>;
    }

    return(
        <>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='center'
            >
                <TodoInput/>
                {query.data.map(td => 
                <Todo todo={td}></Todo>
                )}
            </VStack>
        </>
    );

}

export default Todos;

function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; }) {
    throw new Error('Function not implemented.');
}


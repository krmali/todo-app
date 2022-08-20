import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import {useQuery} from 'react-query';
import {getTodos} from '../api/api'
import Todo from './todo';

const Todos = () => {
    const query = useQuery('todos',  getTodos);
    const [isErrorShown, setIsErrorShown] = useState<boolean>(false);
    const toast = useToast();

    if (query.isLoading || query.isIdle) {
        // return <h1>Loading...</h1>;
        return   <Center><Spinner size='xl' /></Center>;

    }
    if (query.isError) {
        if(!isErrorShown){
            toast({
              title: 'Network Error',
              description: "oops, it seems that there is a technical issue.",
              status: 'error',
              duration: 1000,
              isClosable: true,
            })
            setIsErrorShown(true);
        }
        return <></>;
    }

    return(
        <ul>
            {query.data.map(td => 
                <li key={td.id}>
                    <Todo todo={td}></Todo>
                </li>
            )}
        </ul>
    );

}

export default Todos;

function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; }) {
    throw new Error('Function not implemented.');
}


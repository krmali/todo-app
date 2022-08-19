import {useQuery} from 'react-query';
import {getTodos} from '../api/api'
import Todo from './todo';

const Todos = () => {
    const query = useQuery('todos',  getTodos);

    if (query.isLoading || query.isIdle) {
        return <h1>Loading...</h1>;
    }
    if (query.isError) {
        // const error = query.data;
        return <span>Error</span>
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


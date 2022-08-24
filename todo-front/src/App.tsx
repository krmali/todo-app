import './App.css';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import {AuthProvider} from './providers/auth_provider';
import { ChakraProvider } from '@chakra-ui/react'
import Pages from './components/Auth/pages';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <AuthProvider>
                    <Pages/>
                </AuthProvider>
            </ChakraProvider>
        </QueryClientProvider>
    );
}

export default App;

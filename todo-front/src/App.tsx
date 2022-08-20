// import logo from './logo.svg';
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


            // <div className="App">
            //   <header className="App-header">
            //     <img src={logo} className="App-logo" alt="logo" />
            //     <p>
            //       Edit <code>src/App.tsx</code> and save to reload.
            //     </p>
            //     <a
            //       className="App-link"
            //       href="https://reactjs.org"
            //       target="_blank"
            //       rel="noopener noreferrer"
            //     >
            //       Learn React
            //     </a>
            //   </header>
            // </div>
           );
}

export default App;

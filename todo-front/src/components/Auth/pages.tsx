import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/auth_provider";
import Navbar from "../navbar";
import Todos from "../todos";
import AuthTabs from "./auth_tabs";
import { login as login_api } from '../../api/api';
import { Center, Spinner } from "@chakra-ui/react";

const Pages = () => {
    const { user , authenticate } = useContext(AuthContext);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const login = async (username: string , password: string) => {
        const person = await login_api(username, password);
        if (person) {
            localStorage.setItem("username", person.username);
            localStorage.setItem("password", person.password);
            localStorage.setItem("id", person.id.toString());
            localStorage.setItem("token", person.token);
            authenticate(person);
            setIsLoading(false); 
            return;
        }
    };

    useEffect(() => {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        if(!user && username && password){
            login(username, password);
        }else{
            setIsLoading(false);
        }
    });

    return(
        <>
        {isLoading? <Center><Spinner size="xl"/></Center>: 
            (user? <div><Navbar/><Todos/></div> : <AuthTabs />)}
        </>
    );
}
export default Pages;

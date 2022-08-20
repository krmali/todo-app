import { useContext } from "react";
import { AuthContext } from "../../providers/auth_provider";
import Navbar from "../navbar";
import Todos from "../todos";
import AuthTabs from "./auth_tabs";

const Pages = () => {
    const {user } = useContext(AuthContext);
    return(
        <>
            {user? <div><Navbar/><Todos/></div> : <AuthTabs />}
        </>
    );
}
export default Pages;

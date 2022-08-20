import { createContext, useState } from "react";
import { login as api_login } from "../api/api";

export type User = null | {
username: string,token: string, id:number
}

// const AuthContext = createContext<User>(null);
const AuthContext = createContext<{user: User, 
    authenticate: (user: User) => void,
    logout: () => void,}>
    ({user: null, 
        authenticate: () => {},
        logout: () => {}
    });


const AuthProvider = ({children}: {children : JSX.Element}) => {
    const [user, setUser] = useState<User>(null);

    return (
        <AuthContext.Provider value={{user:user,
            authenticate: (user: User) => setUser(user),
            logout: () => setUser(null)
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};

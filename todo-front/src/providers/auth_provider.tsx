import { createContext, useState } from "react";

export type User = null | {
    username: string, password: string,token: string, id:number
}

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
                logout: () => {
                    setUser(null);
                    localStorage.removeItem("username");
                    localStorage.removeItem("password");
                    localStorage.removeItem("id");
                    localStorage.removeItem("token");
                }
        }}>
        {children}
    </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};

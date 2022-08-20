import { createContext } from "react"

type User = null | {
  email: string,
  refreshToken: string 
}

export const AuthContext = createContext<{
    user: User,
    login: (email: string, password: string) => void,
    logout: () => void,
    token: string 
}>({
    user: null,
    login: () => {},
    logout: () => {},
    token: ""
});


const AuthProvider = () => {

}

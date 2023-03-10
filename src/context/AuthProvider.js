import { createContext, useState } from "react";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {console.log("Authproider",children)}
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;
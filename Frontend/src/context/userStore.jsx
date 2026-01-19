import {createContext, useContext, useState} from "react";

export const AuthContext = createContext();


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth not context");
    return context;
}

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    // const [error, setError] = useState();

    const saveUser = (user) => {
        setUser(user);
    }

    const deleteUser = () => {
        setUser(null);
    }

    const value = {
        saveUser, deleteUser, user
    }

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
}
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth not context");
	return context;
};

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [AccessToken, setAccessToken] = useState(null);
    const [items, setItems] = useState(null);
	// const [error, setError] = useState();

	const saveUser = (user) => {
		setUser(user);
	};

    const saveItems = (items) => {
        setItems(items);
    }

	const deleteUser = () => {
		setUser(null);
	};

	const saveToken = (token) => {
		setAccessToken(token);
	};

	const value = {
		saveUser,
		deleteUser,
		user,

		saveToken,
		AccessToken,

        saveItems,
        items,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

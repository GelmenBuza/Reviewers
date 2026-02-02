import "./App.css";
import { useState } from "react";
import { useUserApi } from "./api/useAuthApi.js";
import { useAuth } from "./context/userStore.jsx";
import { useNavigate } from "react-router";


async function refreshToken() {
    const BASE_URL = "/api/auth";

    const res = await fetch(`${BASE_URL}/refreshToken`, {
        method: "POST",
        credentials: "include"
    })
    return await res.json()
}


function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { saveUser, saveToken, AccessToken } = useAuth();
	const navigate = useNavigate();

	const submit = async (e) => {
		e.preventDefault();
		const res = await useUserApi.login(email, password);
		if (res.code === 200) {
			saveToken(res.AccessToken);
			saveUser(res.user);
            const token = await refreshToken()
            window.sessionStorage.setItem("accessToken", token.AccessToken)
			navigate("/catalog");
		}
	};
	return (
		<form onSubmit={(e) => submit(e)}>
			<input
				type="text"
				placeholder="Login"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input type="submit" value="Login" />
		</form>
	);
}

export default Login;

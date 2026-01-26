import { useState } from "react";
import { useUserApi } from "../../api/useAuthApi";
import { useNavigate } from "react-router";

export default function RegisterPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await useUserApi.register(email, name, password);
		console.log(res);
		if (res.user) {
			navigate("/login");
		}
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Почта..."
			/>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Имя..."
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Пароль..."
			/>
			<button type="submit">Зарегистрироватся</button>
		</form>
	);
}

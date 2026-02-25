import { useState } from "react";
import { useUserApi } from "../../api/useAuthApi";
import { useNavigate, Link } from "react-router";
import style from "./style.module.css";
import { useAuthStore } from "../../stores/userStore.jsx";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuthStore();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await login(email, password);
		console.log(res);
		if (res.success) {
			navigate("/");
		}
	};

	return (
		<div className={style.formContainer}>
			<form onSubmit={(e) => handleSubmit(e)} className={style.loginForm}>
				<label>
					<input
						type="text"
						placeholder="Логин..."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					<input
						type="password"
						placeholder="Пароль..."
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit">Войти</button>
			</form>
			<Link to={"/register"}>Нет аккаунта?</Link>
		</div>
	);
}

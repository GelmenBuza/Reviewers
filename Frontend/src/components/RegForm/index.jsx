import { useState } from "react";
import { useUserApi } from "../../api/useAuthApi";
import { useNavigate, Link } from "react-router";
import style from "./style.module.css";

export default function RegisterForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};

		// Email
		if (!email) {
			newErrors.email = "Почта не должена быть пустой";
		}

		// Name
		if (!name) {
			newErrors.name = "Имя не может быть пустым";
		}

		// Password
		if (!password) {
			newErrors.password = "Пароль не должен быть пустым";
		} else if (password.length < 6) {
			newErrors.password = "Пароль должен быть не менее 6 символов";
		}

		// Confirm Password
		if (password !== confirmPassword) {
			newErrors.confirmPassword = "Пароли должны совпадать";
		}
		setErrors(newErrors);
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationResult = validateForm();

		if (Object.keys(validationResult).length > 0) {
			return;
		}

		const res = await useUserApi.register(email, name, password);
		console.log(res);
		if (res.user) {
			navigate("/login");
		}
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)} className={style.regForm}>
			<label
				className={
					errors.email ? style.inputError : style.inputContainer
				}
			>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Почта..."
				/>

				{errors.email && (
					<>
						<svg
							width="20px"
							height="20px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							stroke="#000000"
							stroke-width="0"
							className={style.errorInfo}
						>
							<g stroke-width="0"></g>
							<g
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke="#CCCCCC"
								stroke-width="0.05"
							></g>
							<g>
								<path
									d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25Z"
									fill="#000000"
								></path>
								<path
									d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
									fill="#000000"
								></path>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
									fill="#000000"
								></path>
							</g>
						</svg>
						<span className={style.error}>{errors.email}</span>
					</>
				)}
			</label>

			<label
				className={
					errors.name ? style.inputError : style.inputContainer
				}
			>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Имя..."
				/>

				{errors.name && (
					<>
						<svg
							width="20px"
							height="20px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							stroke="#000000"
							stroke-width="0"
							className={style.errorInfo}
						>
							<g stroke-width="0"></g>
							<g
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke="#CCCCCC"
								stroke-width="0.05"
							></g>
							<g>
								<path
									d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25Z"
									fill="#000000"
								></path>
								<path
									d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
									fill="#000000"
								></path>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
									fill="#000000"
								></path>
							</g>
						</svg>
						<span className={style.error}>{errors.name}</span>
					</>
				)}
			</label>

			<label
				className={
					errors.password ? style.inputError : style.inputContainer
				}
			>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Пароль..."
				/>

				{errors.password && (
					<>
						<svg
							width="20px"
							height="20px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							stroke="#000000"
							stroke-width="0"
							className={style.errorInfo}
						>
							<g stroke-width="0"></g>
							<g
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke="#CCCCCC"
								stroke-width="0.05"
							></g>
							<g>
								<path
									d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25Z"
									fill="#000000"
								></path>
								<path
									d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
									fill="#000000"
								></path>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
									fill="#000000"
								></path>
							</g>
						</svg>
						<span className={style.error}>{errors.password}</span>
					</>
				)}
			</label>

			<label
				className={
					errors.confirmPassword
						? style.inputError
						: style.inputContainer
				}
			>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder={"Повтор пароля..."}
				/>

				{errors.confirmPassword && (
					<>
						<svg
							width="20px"
							height="20px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							stroke="#000000"
							stroke-width="0"
							className={style.errorInfo}
						>
							<g stroke-width="0"></g>
							<g
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke="#CCCCCC"
								stroke-width="0.05"
							></g>
							<g>
								<path
									d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25Z"
									fill="#000000"
								></path>
								<path
									d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
									fill="#000000"
								></path>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
									fill="#000000"
								></path>
							</g>
						</svg>
						<span className={style.error}>
							{errors.confirmPassword}
						</span>
					</>
				)}
			</label>

			<button type="submit">Зарегистрироватся</button>
		</form>
	);
}

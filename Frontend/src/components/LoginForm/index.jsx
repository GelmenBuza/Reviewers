import {useState} from "react";
import {useUserApi} from "../../api/useAuthApi";
import {useNavigate, Link} from "react-router";
import style from "./style.module.css";
import {useAuth} from "../../context/userStore.jsx";

async function refreshToken() {
    const BASE_URL = "/api/auth";

    const res = await fetch(`${BASE_URL}/refreshToken`, {
        method: "POST",
        credentials: "include",
    });
    return await res.json();
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { saveUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await useUserApi.login(email, password);
        if (res.code === 200) {
            saveUser(res.user);
            const token = await refreshToken();
            window.sessionStorage.setItem("accessToken", token.AccessToken);
            navigate("/catalog");
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
            <Link to={"/"}>Нет аккаунта?</Link>
        </div>
    );
}

import {useEffect, useRef, useState} from "react";
import {useUserApi} from "../../api/useAuthApi";
import {useNavigate, Link} from "react-router";
import style from "./style.module.css";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const validateTimeout = useRef(null);

    useEffect(() => {
        return () => {
            if (validateTimeout.current) {
                clearTimeout(validateTimeout.current);
            }
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};

        // Email
        if (!email) {
            newErrors.email = 'Почта не должена быть пустой';
        }

        // Name
        if (!name) {
            newErrors.name = 'Имя не может быть пустым';
        }

        // Password
        if (!password) {
            newErrors.password = 'Пароль не должен быть пустым';
        } else if (password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов';
        }

        // Confirm Password
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Пароли должны совпадать';
        }
        setErrors(newErrors);
        return newErrors;
    }
    const debouncedValidation = () => {
        if (validateTimeout.current) {
            clearTimeout(validateTimeout.current);
        }

        validateTimeout.current = setTimeout(() => {
            validateForm();
            console.log('da')
        }, 500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationResult = validateForm();

        if (Object.keys(validationResult).length > 0) {
            return
        }


        const res = await useUserApi.register(email, name, password);
        console.log(res);
        if (res.user) {
            navigate("/login");
        }
    };

    return (
        <div className={style.registrationPage}>
            <form onSubmit={(e) => handleSubmit(e)} >
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        debouncedValidation()
                    }}
                    placeholder="Почта..."
                />
                {errors.email && (
                    <span className={style.error}>{errors.email}</span>
                )}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        debouncedValidation()
                    }}
                    placeholder="Имя..."
                />
                {errors.name && (
                    <span className={style.error}>{errors.name}</span>
                )}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        debouncedValidation()
                    }}
                    placeholder="Пароль..."
                />
                {errors.password && (
                    <span className={style.error}>{errors.password}</span>
                )}
                <input type="password"
                       value={confirmPassword}
                       onChange={(e) => {
                           setConfirmPassword(e.target.value)
                           debouncedValidation()
                       }}
                       placeholder={'Повтор пароля...'}
                />
                {errors.confirmPassword && (
                    <span className={style.error}>{errors.confirmPassword}</span>
                )}
                <button type="submit">Зарегистрироватся</button>
            </form>
            <Link to={'/login'}>Уже есть аккаунт?</Link>
        </div>
    )
}
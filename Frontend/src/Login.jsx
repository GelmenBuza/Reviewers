import './App.css'
import {useState} from "react";
import {useUserApi} from "./api/useAuthApi.js";
import {useAuth} from "./context/userStore.jsx";
import {useNavigate} from "react-router";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {saveUser} = useAuth();
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault()
        const res = await useUserApi.login(email, password);
        if (res.code === 200) {
            saveUser(res.user);
            navigate('/catalog');
        }
    }

    return (
        <form onSubmit={(e) => submit(e)}>
            <input type="text" placeholder='Login' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" value="Login"/>
        </form>
    )
}

export default Login

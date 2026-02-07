import style from "./style.module.css";
import LoginForm from "../../components/LoginForm/index.jsx";



function LoginPage() {

	return (
		<div className={style.loginPage}>
            <LoginForm></LoginForm>
		</div>
	);
}

export default LoginPage;

import style from "./style.module.css";
import LoginForm from "../../components/LoginForm/index.jsx";
import NavMenu from "../../components/Header";

function LoginPage() {
	return (
		<div className={`pageContainer`}>
			<NavMenu />
			<div className={style["main"]}>
				<LoginForm />
			</div>
		</div>
	);
}

export default LoginPage;

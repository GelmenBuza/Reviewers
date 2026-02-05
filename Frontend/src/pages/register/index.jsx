import { Link } from "react-router";
import style from "./style.module.css";
import RegisterForm from "../../components/RegForm";

export default function RegisterPage() {
	return (
		<div className={style.registrationPage}>
			<RegisterForm />
			<Link to={"/login"}>Уже есть аккаунт?</Link>
		</div>
	);
}

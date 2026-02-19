import style from "./style.module.css";
import RegisterForm from "../../components/RegForm";
import NavMenu from "../../components/Header";

export default function RegisterPage() {
	return (
		<div className="pageContainer">
			<NavMenu />
			<div className={style["main"]}>
				<RegisterForm />
			</div>
		</div>
	);
}

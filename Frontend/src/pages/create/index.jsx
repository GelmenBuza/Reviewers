import style from "./style.module.css";
import ReviewForm from "../../components/ReviewForm";
import NavMenu from "../../components/Header";

function LoginPage() {
	return (
		<div className={`pageContainer`}>
			<NavMenu />
			<ReviewForm />
		</div>
	);
}

export default LoginPage;

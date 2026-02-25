import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/userStore.jsx";
import style from "./style.module.css";
import searchImg from "../../assets/search.svg";
import { useState } from "react";

const NavMenu = () => {
	const { user } = useAuthStore();
	const [searchItem, setSearchItem] = useState("");
	const navigate = useNavigate();

	const handleSearch = () => {
		const normalizedText = searchItem.replace(" ", "+");
		navigate(`/search/${normalizedText}`);
	};

	const onCreateClick = () => {};

	return (
		<header className={style.header}>
			<nav className={style["header-nav"]}>
				<NavLink to={"/"}>Отзывы</NavLink>

				{user !== null ? (
					<span className={style.username}>{user.username}</span>
				) : (
					<div className={style.regLog}>
						<NavLink to={"/login"}>Войдите</NavLink>
						<span> или </span>
						<NavLink to={"/register"}>Зарегистрируйтесь</NavLink>
					</div>
				)}
			</nav>
			<div className={style["header-main"]}>
				<div className={style["header-logo"]}>
					<NavLink to={"/"} />
				</div>
				<form
					className={style["header-search"]}
					onSubmit={() => handleSearch()}
				>
					<label className={style["header-search-input"]}>
						<input
							type="text"
							placeholder={"Введите предмет..."}
							value={searchItem}
							onChange={(e) => setSearchItem(e.target.value)}
						/>
					</label>
					<button className={style["header-search-btn"]}>
						<img src={searchImg} alt="Поиск" />
					</button>
				</form>
				<button onClick={() => onCreateClick()}>Создать отзыв</button>
			</div>
		</header>
	);
};

export default NavMenu;

import {NavLink} from "react-router";
import {useUser} from "../../stores/userStore.jsx";
import style from './style.module.css';
import searchImg from "../../assets/search.svg";
import {useState} from "react";

const NavMenu = () => {
    const user = useUser(state => state.user)
    const [searchItem, setSearchItem] = useState(null);

    const handleSearch = () => {

    }

    return (
        <header className={style.header}>
            <nav className={style['header-nav']}>
                <NavLink to={'/'}>Отзывы</NavLink>

                {Object.keys(user).length !== 0 ?

                    <span className={style.username}>{user.username}</span>
                    :
                    <div className={style.regLog}>
                        <NavLink to={'/login'}>Войдите</NavLink>
                        <span> или </span>
                        <NavLink to={'/register'}>Зарегистрируйтесь</NavLink>
                    </div>
                }
            </nav>
            <div className={style['header-main']}>
                <div className={style['header-logo']}>
                    <NavLink to={'/'}/>
                </div>
                <form className={style['header-search']}>
                    <label className={style['header-search-input']}>
                        <input type="text" placeholder={"Введите предмет..."} value={searchItem} onChange={(e) => setSearchItem(e.target.value)}/>
                    </label>
                    <button className={style['header-search-btn']}><img src={searchImg} alt="Поиск"/></button>
                </form>
            </div>
        </header>
    );
};

export default NavMenu;

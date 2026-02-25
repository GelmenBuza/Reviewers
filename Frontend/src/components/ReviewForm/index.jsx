import style from "./style.module.css";
import {useReviewApi} from "../../api/useReviewApi";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router";

const ReviewForm = () => {
    const textareaRef = useRef(null);
    const [item, setItem] = useState("");
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const handleSubmitItem = (e) => {
        e.preventDefault();
        if (item !== "") {
            setIsItemSelected(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await useReviewApi.createReview(item, title, content, rating, []);
        console.log(res, '++');
        navigate("/");
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [content]);
    return (
        <div className={style["form-container"]}>
            <h3>Создание отзыва</h3>
            {!isItemSelected ? (
                <from className={style.form}>
                    <h4 className={style["input-description"]}>Введите название предмета:</h4>
                    <label>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            placeholder="Предмет..."
                            required
                        />

                    </label>
                    <button type="submit" onClick={(e) => handleSubmitItem(e)}>Далее</button>
                </from>

            ) : (
                <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                    <h4 className={style["input-description"]}>Ваши общие впечатления:</h4>
                    <label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Заголовок..."
                            required
                        />
                    </label>
                    <h4 className={style["input-description"]}>Текст отзыва:</h4>
                    <label className={style.contentArea}>
						<textarea
                            ref={textareaRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Описание..."
                            rows={1}
                            required
                        />
                    </label>
                    <h4 className={style["input-description"]}>Оцените от 0 до 5:</h4>
                    <label>
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            placeholder="Оценка..."
                            required
                        />
                    </label>
                    <h4 className={style["input-description"]}>Подгрузите фотографии:</h4>
                    <label>
                        <input type="file"/>
                    </label>
                    <button type="submit">Отправить отзыв</button>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;

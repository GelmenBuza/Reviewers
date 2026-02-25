import style from "./style.module.css";
import { useReviewApi } from "../../api/useReviewApi";
import { useState, useEffect, useRef } from "react";

const ReviewForm = () => {
	const textareaRef = useRef(null);
	const [item, setItem] = useState("");
	const [isItemSelected, setIsItemSelected] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(0);

	const handleSubmitItem = (e) => {
		e.preventDefault();
		setIsItemSelected(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await useReviewApi.createReview(item, title, content, rating, []);
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
				<from
					className={style.form}
					onSubmit={(e) => handleSubmitItem(e)}
				>
					<label>
						<input
							type="text"
							value={item}
							onChange={(e) => setItem(e.target.value)}
							placeholder="Предмет..."
							required
						/>
					</label>
					<button type="submit">Далее</button>
				</from>
			) : (
				<form className={style.form} onSubmit={(e) => handleSubmit(e)}>
					<label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Заголовок..."
							required
						/>
					</label>
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
					<label>
						<input
							type="number"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
							placeholder="Оценка..."
							required
						/>
					</label>
					<label>
						<input type="file" />
					</label>
					<button type="submit">Отправить отзыв</button>
				</form>
			)}
		</div>
	);
};

export default ReviewForm;

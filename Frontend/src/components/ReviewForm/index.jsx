import style from "./style.module.css";
import { useReviewApi } from "../../api/useReviewApi";
import { useState, useEffect, useRef } from "react";
import closeImg from "../../assets/close.svg";

const ReviewForm = ({
	refreshCatalog,
	setRefreshCatalog,
	setCreateFlag,
	oldItem = null,
}) => {
	const textareaRef = useRef(null);
	const [item, setItem] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(0);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await useReviewApi.createReview(
			item,
			title,
			content,
			rating,
			[],
		);
		setRefreshCatalog(!refreshCatalog);
		setCreateFlag(false);
	};

	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, [content]);
	return (
		<form className={style.form} onSubmit={(e) => handleSubmit(e)}>
			<h3>Создание отзыва</h3>
			<button
				className={style.closeBtn}
				onClick={() => setCreateFlag(false)}
			>
				<img src={closeImg} alt="close" />
			</button>
			{oldItem ? (
				<span className={style.item}>Предмет: {oldItem}</span>
			) : (
				<label>
					<input
						type="text"
						value={item}
						onChange={(e) => setItem(e.target.value)}
						placeholder="Предмет..."
						required
					/>
				</label>
			)}
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
	);
};

export default ReviewForm;

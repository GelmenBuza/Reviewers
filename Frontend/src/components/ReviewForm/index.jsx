import style from "./style.module.css";
import { useReviewApi } from "../../api/useReviewApi";
import { useState } from "react";

const ReviewForm = ({
	refreshCatalog,
	setRefreshCatalog,
	setCreateFlag,
	oldItem = null,
}) => {
	const [item, setItem] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(0);
	console.log(oldItem);
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
	return (
		<form className={style.form} onSubmit={(e) => handleSubmit(e)}>
			{oldItem ? (
				<span>{oldItem}</span>
			) : (
				<input
					type="text"
					value={item}
					onChange={(e) => setItem(e.target.value)}
					placeholder="Предмет..."
					required
				/>
			)}
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Заголовок..."
				required
			/>
			<input
				type="textarea"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Описание..."
				required
			/>
			<input
				type="number"
				value={rating}
				onChange={(e) => setRating(e.target.value)}
				placeholder="Оценка..."
				required
			/>
			<input type="file" />
			<button type="submit">Отправить отзыв</button>
		</form>
	);
};

export default ReviewForm;

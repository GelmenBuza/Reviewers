import style from "./style.module.css";
import { useUserApi } from "../../api/useAuthApi";
import { useEffect, useState } from "react";

const ReviewCard = ({ item }) => {
	const [author, setAuthor] = useState();

	useEffect(() => {
		const getAuthor = async () => {
			const { user } = await useUserApi.getUserById(item.authorId);
			setAuthor(user);
		};
		getAuthor();
	}, [item.authorId]);
	console.log(author);
	return (
		<div className={style.card}>
			<div className={style.images}></div>
			<div className={style.reviewData}>
				<div className={style.reviewContent}>
					<h3 className={style.reviewTitle}>{item.title}</h3>
					<p className={style.reviewDesc}>{item.content}</p>
				</div>
				<div className={style.reviewInfo}>
					<p className={style.reviewCreatedAt}>{item.createdAt}</p>
					<p className={style.reviewAuthor}>
						{author ? author.username : "Загрузка..."}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;

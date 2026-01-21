import style from "style.module.css";
import { useUserApi } from "../../api/useAuthApi";

export default function ReviewCard({ item }) {
	const authorId = useUserApi.getUserNameById(item.authorId);

	return (
		<div className={style.card}>
			<div className={style.images}></div>
			<div className={reviewData}>
				<div className={style.reviewContent}>
					<h3 className={style.reviewTitle}>{item.title}</h3>
					<p className={style.reviewContent}>{item.content}</p>
				</div>
				<div className={reviewInfo}>
					<p className={style.reviewCreatedAt}>{item.createdAt}</p>
					<p className={style.reveiwAuthor}>{authorId}</p>
				</div>
			</div>
		</div>
	);
}

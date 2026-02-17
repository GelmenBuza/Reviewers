import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useReviewApi } from "../../api/useReviewApi.js";
import ReviewCard from "../ReviewCard";

export default function ReviewsCatalog({ refreshCatalog, itemId }) {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const getReviews = async () => {
			setReviews(await useReviewApi.getReviewsByItemID(itemId));
		};
		getReviews();
	}, [refreshCatalog]);

	return (
		<div className={style.catalog}>
			{reviews.map((item) => (
				<ReviewCard key={item.id} item={item} />
			))}
		</div>
	);
}

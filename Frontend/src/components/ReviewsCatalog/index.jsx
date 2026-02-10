import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useReviewApi } from "../../api/useReviewApi.js";
import ReviewCard from "../ReviewCard";
import { useUser } from "../../stores/userStore.jsx";

export default function ReviewsCatalog({ refreshCatalog }) {
	const [reviews, setReviews] = useState(useUser((state) => state.reviews));

	useEffect(() => {
		const getReviews = async () => {
			setReviews(
				await useReviewApi.getReviewsByItemID(reviews[0].ItemId),
			);
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

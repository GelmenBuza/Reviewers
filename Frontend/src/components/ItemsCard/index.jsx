import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useReviewApi } from "../../api/useReviewApi.js";
import { useNavigate } from "react-router";
import { useUser } from "../../stores/userStore.jsx";

const ItemCard = ({ item }) => {
	const saveReviews = useUser((state) => state.setReviews);
	const navigate = useNavigate();
	const onCardClick = async () => {
		navigate(`/reviews/${item.id}`);
	};

	return (
		<div className={style.card} onClick={() => onCardClick()}>
			<div className={style.images}></div>
			<div className={style.itemData}>
				<span className={style.itemTitle}>{item.title}</span>
			</div>
		</div>
	);
};
export default ItemCard;

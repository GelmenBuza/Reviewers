import style from "./style.module.css";
import { useEffect, useState } from "react";

const ItemCard = ({ item }) => {
	const onCardClick = () => {};

	return (
		<div className={style.card}>
			<div className={style.images}></div>
			<div className={style.itemData}>
				<span className={style.itemTitle}>{item.title}</span>
			</div>
		</div>
	);
};

export default ItemCard;

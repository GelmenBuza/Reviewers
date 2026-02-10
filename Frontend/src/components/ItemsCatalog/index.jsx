import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useItemsApi } from "../../api/useItemApi.js";
import ItemCard from "../ItemsCard";

export default function ItemsCatalog() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const getItems = async () => {
			setItems(await useItemsApi.getItems());
		};
		getItems();
	}, []);
	return (
		<div className={style.catalog}>
			{items.map((item) => (
				<ItemCard key={item.id} item={item} />
			))}
		</div>
	);
}

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
			<div className={style.subCatalog}>
				<h3>Новые предметы</h3>
				<div className={style["subCatalog-items"]}>
					{items
						.slice(items.length - 5, items.length)
						.reverse()
						.map((item) => (
							<ItemCard key={item.id} item={item} />
						))}
				</div>
			</div>
			<div className={style.subCatalog}>
				<h3>Все предметы</h3>
				<div className={style["subCatalog-items"]}>
					{items.map((item) => (
						<ItemCard key={item.id * 100} item={item} />
					))}
				</div>
			</div>
		</div>
	);
}

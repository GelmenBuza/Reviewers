import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useParams } from "react-router";
import { useItemsApi } from "../../api/useItemApi";
import DesiredItem from "../../components/DesiredItem";
import NavMenu from "../../components/Header";

const SearchPage = () => {
	const [similarItems, setSimilarItems] = useState([]);
	const { params } = useParams();
	useEffect(() => {
		const getSimilarItems = async () => {
			if (params === "null") {
				const items = await useItemsApi.getItems();
				setSimilarItems(items);
			} else {
				const { items } = await useItemsApi.getSimilarItem(params);
				setSimilarItems(items);
			}
		};
		getSimilarItems();
	}, []);

	console.log(similarItems);
	return (
		<div className="pageContainer">
			<NavMenu />
			{similarItems ? (
				similarItems.map((item) => <DesiredItem item={item} />)
			) : (
				<span>Загрузка...</span>
			)}
		</div>
	);
};

export default SearchPage;

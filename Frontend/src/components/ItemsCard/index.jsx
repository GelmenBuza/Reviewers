import style from "./style.module.css";
import { useNavigate } from "react-router";
import ImagePlaceholder from "../ImagePlaceholder";

const ItemCard = ({ item }) => {
	const navigate = useNavigate();
	const onCardClick = async () => {
		navigate(`/reviews/${item.id}`);
	};

	return (
		<div className={style.card} onClick={() => onCardClick()}>
			<div className={style.images}>
				{item.images ? item.images : <ImagePlaceholder />}
			</div>
			<div className={style.itemData}>
				<span className={style.itemTitle}>{item.title}</span>
			</div>
		</div>
	);
};
export default ItemCard;

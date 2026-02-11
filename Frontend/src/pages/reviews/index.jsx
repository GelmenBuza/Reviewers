import { useEffect, useState } from "react";
import ItemsCatalog from "../../components/ItemsCatalog";
import ReviewForm from "../../components/ReviewForm";
import style from "./style.module.css";
import ReviewsCatalog from "../../components/ReviewsCatalog/index.jsx";
import { useUser } from "../../stores/userStore.jsx";
import { useItemsApi } from "../../api/useItemApi.js";

export default function ReviewsPage() {
	const [createFlag, setCreateFlag] = useState(false);
	const [refreshCatalog, setRefreshCatalog] = useState(false);
	const [title, setTitle] = useState("");
	const reviews = useUser((state) => state.reviews);
	useEffect(() => {
		const getItemTitle = async () => {
			const item = await useItemsApi.getItemById(reviews[0].ItemId);
			setTitle(item.title);
		};
		getItemTitle();
	}, [reviews]);

	return (
		<div className={style.ReviewsPage}>
			<div className={style.contentContainer}>
				<div className={style.titleContainer}>
					<h2 className={style.title}>{title}</h2>
				</div>
				<ReviewsCatalog refreshCatalog={refreshCatalog} />
			</div>
			{createFlag ? (
				<div className={style.formContaner}>
					<ReviewForm
						refreshCatalog={refreshCatalog}
						setRefreshCatalog={setRefreshCatalog}
						setCreateFlag={setCreateFlag}
						oldItem={title}
					/>
				</div>
			) : (
				<button onClick={() => setCreateFlag(!createFlag)}>
					Создать отзыв на предмет
				</button>
			)}
		</div>
	);
}

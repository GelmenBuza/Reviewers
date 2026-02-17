import { useEffect, useState } from "react";
import ReviewForm from "../../components/ReviewForm";
import style from "./style.module.css";
import ReviewsCatalog from "../../components/ReviewsCatalog/index.jsx";
import { useItemsApi } from "../../api/useItemApi.js";
import { useParams } from "react-router";

export default function ReviewsPage() {
	const [createFlag, setCreateFlag] = useState(false);
	const [refreshCatalog, setRefreshCatalog] = useState(false);
	const [title, setTitle] = useState("");
	const { itemId } = useParams(); //!!!!!!!!!!!!!!

	useEffect(() => {
		setTimeout(() => {
			const getItemTitle = async () => {
				setTitle((await useItemsApi.getItemById(itemId)).title);
			};
			getItemTitle();
		}, 500);
	}, []);
	return (
		<div className={style.ReviewsPage}>
			<div className={style.contentContainer}>
				<div className={style.titleContainer}>
					<h2 className={style.title}>
						{title ? title : "Загрузка..."}
					</h2>
				</div>
				<ReviewsCatalog
					key={itemId}
					refreshCatalog={refreshCatalog}
					itemId={itemId}
				/>
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

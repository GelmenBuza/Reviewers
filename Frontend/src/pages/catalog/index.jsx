import { useState } from "react";
import ItemsCatalog from "../../components/ItemsCatalog";
import ReviewForm from "../../components/ReviewForm";
import style from "./style.module.css";

export default function CatalogPage() {
	const [createFlag, setCreateFlag] = useState(false);
	const [refreshCatalog, setRefreshCatalog] = useState(false);

	return (
		<div className={style.CatalogPage}>
			<ItemsCatalog refreshCatalog={refreshCatalog} />
			{createFlag ? (
				<ReviewForm
					refreshCatalog={refreshCatalog}
					setRefreshCatalog={setRefreshCatalog}
					setCreateFlag={setCreateFlag}
				/>
			) : (
				<button onClick={() => setCreateFlag(!createFlag)}></button>
			)}
		</div>
	);
}

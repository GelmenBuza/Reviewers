import { useState } from "react";
import ReviewsCatalog from "../../components/ReviewsCatalog";
import ReviewForm from "../../components/ReviewForm";

export default function CatalogPage() {
	const [createFlag, setCreateFlag] = useState(false);
	const [refreshCatalog, setRefreshCatalog] = useState(false);

	return (
		<div>
			<ReviewsCatalog refreshCatalog={refreshCatalog} />
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

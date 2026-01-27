import { useState } from "react";
import ReviewsCatalog from "../../components/ReviewsCatalog";
import ReviewForm from "../../components/ReviewForm";

export default function CatalogPage() {
	const [createFlag, setCreateFlag] = useState(false);

	return (
		<div>
			<ReviewsCatalog />
			{createFlag ? (
				<ReviewForm />
			) : (
				<button onClick={() => setCreateFlag(!createFlag)}></button>
			)}
		</div>
	);
}

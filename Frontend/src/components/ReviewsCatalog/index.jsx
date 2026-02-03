import { useAuth } from "../../context/userStore.jsx";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useReviewApi } from "../../api/useReviewApi.js";
import ReviewCard from "../ReviewCard";
import { useUserApi } from "../../api/useAuthApi.js";

export default function ReviewsCatalog({ refreshCatalog }) {
	const [reviews, setReviews] = useState([]);
	// const { user } = useAuth();
	// const [sort, setSort] = useState("name");
	// const [reviews, setReviews] = useState(review);

	// useEffect(() => {
	//         if (sort === 'name') {
	//             const sortedProducts = [...review].sort((a, b) => {
	//                     if (a.title.toLowerCase() < b.title.toLowerCase()) {
	//                         return -1;
	//                     }
	//                     if (a.title.toLowerCase() > b.title.toLowerCase()) {
	//                         return 1;
	//                     }
	//                     return 0;
	//                 }
	//             )
	//             setProducts(sortedProducts)
	//         } else {
	//             setProducts(review)
	//         }
	//     }
	//     ,
	//     [sort]
	// )

	useEffect(() => {
		const getReviews = async () => {
			setReviews(await useReviewApi.getReviews());
		};
		getReviews();
	}, [refreshCatalog]);

	// {/*{user.role === 'manager' && (*/}
	// {/*    <select name="sortSelect" id="sortSelect" onChange={(e) => setSort(e.target.value)}>*/}
	// {/*        <option value='none' selected>Не сортировать</option>*/}
	// {/*        <option value='name'>Сортировать</option>*/}
	// {/*    </select>*/}
	// {/*)}}*/}
	return (
		<div className={style.catalog}>
			{reviews.map((item) => (
				<ReviewCard key={item.id} item={item} />
			))}
		</div>
	);
}

const BASE_URL = "http://localhost:3000/api/review";

const getAuthHead = () => {
	const token = localStorage.getItem("token");
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
};

const getBaseHead = () => {
	return {
		"Content-Type": "application/json",
	};
};

export const useReviewApi = {
	getReviews: async () => {
		const res = await fetch(`${BASE_URL}`, {
			headers: getBaseHead(),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Get review Error: ${error.message}`);
		}
		return res.json();
	},
	createReview: async (itemTitle, title, content, rating, images) => {
		const res = await fetch(`${BASE_URL}/create`, {
			method: "POST",
			headers: getBaseHead(),
			body: JSON.stringify({
				itemTitle,
				title,
				content,
				rating,
				images,
			}),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Create review Error: ${error.message}`);
		}
		return res.json();
	},
	updateReview: async (id, newTitle, newContent, newRating, newImages) => {
		const res = await fetch(`${BASE_URL}/${id}`, {
			method: "PATCH",
			headers: getBaseHead(),
			body: JSON.stringify({
				newTitle,
				newContent,
				newRating,
				newImages,
			}),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Update review Error: ${error.message}`);
		}
		return res.json();
	},
	deleteReview: async (id) => {
		const res = await fetch(`${BASE_URL}/${id}`, {
			method: "DELETE",
			headers: getBaseHead(),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Delete review Error: ${error.message}`);
		}
		return res.json();
	},
};

import apiRequest from ".";

const BASE_URL = "/api/review";

const getBaseHead = () => {
	return {
		"Content-Type": "application/json",
	};
};

export const useReviewApi = {
	getReviews: async () => {
		try {
			const res = await fetch(`${BASE_URL}`, {
				headers: getBaseHead(),
			});
			if (res.ok) return res.json();
		} catch (e) {
			console.error(e);
		}
	},
	getReviewsByItemID: async (id) => {
		try {
			const res = await fetch(`${BASE_URL}/${id}`, {
				headers: getBaseHead(),
			});
			if (res.ok) return res.json();
		} catch (e) {
			console.error(e);
		}
	},
	createReview: async (itemTitle, title, content, rating, images) => {
		let token = window.sessionStorage.getItem("accessToken");
		const res = await apiRequest(token, `${BASE_URL}/create`, {
			method: "POST",
			body: JSON.stringify({
				itemTitle,
				title,
				content,
				rating,
				images,
			}),
		});
		return res;
	},
	updateReview: async (id, newTitle, newContent, newRating, newImages) => {
		const res = await fetch(`${BASE_URL}/${id}`, {
			method: "PATCH",
			credentials: "include",
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
			credentials: "include",
			headers: getBaseHead(),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Delete review Error: ${error.message}`);
		}
		return res.json();
	},
};
